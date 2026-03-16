import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { X } from 'lucide-react';

/**
 * SphereImageGrid - Interactive 3D Image Sphere Component
 *
 * A React TypeScript component that displays images arranged in a 3D sphere layout.
 * Images are distributed using Fibonacci sphere distribution for optimal coverage.
 * Supports drag-to-rotate, momentum physics, auto-rotation, and modal image viewing.
 *
 * Features:
 * - 3D sphere layout with Fibonacci distribution for even image placement
 * - Smooth drag-to-rotate interaction with momentum physics
 * - Auto-rotation capability with configurable speed
 * - Dynamic scaling based on position and visibility
 * - Collision detection to prevent image overlap
 * - Modal view for enlarged image display
 * - Touch support for mobile devices
 * - Customizable appearance and behaviori
 * - Performance optimized with proper z-indexing and visibility culling
 *
 * Usage:
 * ```tsx
 * <SphereImageGrid
 *   images={imageArray}
 *   containerSize={600}
 *   sphereRadius={200}
 *   autoRotate={true}
 *   dragSensitivity={0.8}
 * />
 * ```
 */

// ==========================================
// TYPES & INTERFACES
// ==========================================

export interface Position3D {
  x: number;
  y: number;
  z: number;
}

export interface SphericalPosition {
  theta: number;  // Azimuth angle in degrees
  phi: number;    // Polar angle in degrees
  radius: number; // Distance from center
}

export interface ImageData {
  id: string;
  src: string;
  alt: string;
  title?: string;
  description?: string;
}

export interface SphereImageGridProps {
  images?: ImageData[];
  containerSize?: number;
  sphereRadius?: number;
  dragSensitivity?: number;
  momentumDecay?: number;
  maxRotationSpeed?: number;
  baseImageScale?: number;
  hoverScale?: number;
  perspective?: number;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  className?: string;
}

interface RotationState {
  x: number;
  y: number;
  z: number;
}

interface VelocityState {
  x: number;
  y: number;
}

interface MousePosition {
  x: number;
  y: number;
}

// ==========================================
// CONSTANTS & CONFIGURATION
// ==========================================

const SPHERE_MATH = {
  degreesToRadians: (degrees: number): number => degrees * (Math.PI / 180),
  radiansToDegrees: (radians: number): number => radians * (180 / Math.PI),
  sphericalToCartesian: (radius: number, theta: number, phi: number): Position3D => ({
    x: radius * Math.sin(phi) * Math.cos(theta),
    y: radius * Math.cos(phi),
    z: radius * Math.sin(phi) * Math.sin(theta)
  }),
  calculateDistance: (pos: Position3D, center: Position3D = { x: 0, y: 0, z: 0 }): number => {
    const dx = pos.x - center.x;
    const dy = pos.y - center.y;
    const dz = pos.z - center.z;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  },
  normalizeAngle: (angle: number): number => {
    while (angle > 180) angle -= 360;
    while (angle < -180) angle += 360;
    return angle;
  }
};

// ==========================================
// MAIN COMPONENT
// ==========================================

const SphereImageGrid: React.FC<SphereImageGridProps> = ({
  images = [],
  containerSize = 400,
  sphereRadius = 200,
  dragSensitivity = 0.5,
  momentumDecay = 0.96,
  maxRotationSpeed = 4,
  baseImageScale = 0.12,
  hoverScale = 1.2,
  perspective = 1000,
  autoRotate = false,
  autoRotateSpeed = 0.2,
  className = ''
}) => {
  // ==========================================
  // STATE & REFS
  // ==========================================
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [isInView, setIsInView] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null); // Only for modal - doesn't affect animation
  const [imagePositions, setImagePositions] = useState<SphericalPosition[]>([]);

  // ALL animation state in refs - NO React state to avoid re-renders
  const rotationRef = useRef<RotationState>({ x: 15, y: 15, z: 0 });
  const velocityRef = useRef<VelocityState>({ x: 0, y: 0 });
  const isDraggingRef = useRef<boolean>(false);
  const hoveredIndexRef = useRef<number | null>(null);
  const loadedImagesRef = useRef<Set<number>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);
  const lastMousePos = useRef<MousePosition>({ x: 0, y: 0 });
  const animationFrame = useRef<number | null>(null);
  const imageElementsRef = useRef<Map<number, HTMLDivElement>>(new Map());
  const basePointsRef = useRef<Position3D[]>([]);

  // ==========================================
  // COMPUTED VALUES
  // ==========================================
  const actualSphereRadius = sphereRadius || containerSize * 0.5;
  const baseImageSize = containerSize * baseImageScale;

  // ==========================================
  // UTILITY FUNCTIONS
  // ==========================================
  const generateSpherePositions = useCallback((): SphericalPosition[] => {
    const positions: SphericalPosition[] = [];
    const basePoints: Position3D[] = [];
    const imageCount = images.length;

    // Use Fibonacci sphere distribution for even coverage
    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    const angleIncrement = 2 * Math.PI / goldenRatio;

    for (let i = 0; i < imageCount; i++) {
      // Fibonacci sphere distribution
      const t = i / imageCount;
      const inclination = Math.acos(1 - 2 * t);
      const azimuth = angleIncrement * i;

      // Convert to degrees
      let phi = inclination * (180 / Math.PI);
      let theta = (azimuth * (180 / Math.PI)) % 360;

      // Map to fuller vertical range
      phi = 15 + (phi / 180) * 150;

      positions.push({
        theta: theta,
        phi: phi,
        radius: actualSphereRadius
      });

      // Precompute base XYZ (no rotation) - computed once and reused
      const thetaRad = SPHERE_MATH.degreesToRadians(theta);
      const phiRad = SPHERE_MATH.degreesToRadians(phi);

      const x = actualSphereRadius * Math.sin(phiRad) * Math.cos(thetaRad);
      const y = actualSphereRadius * Math.cos(phiRad);
      const z = actualSphereRadius * Math.sin(phiRad) * Math.sin(thetaRad);

      basePoints.push({ x, y, z });
    }

    basePointsRef.current = basePoints;
    return positions;
  }, [images.length, actualSphereRadius]);


  const clampRotationSpeed = useCallback((speed: number): number => {
    return Math.max(-maxRotationSpeed, Math.min(maxRotationSpeed, speed));
  }, [maxRotationSpeed]);

  // ==========================================
  // PHYSICS & MOMENTUM
  // ==========================================
  // No need to sync - we're using refs directly now

  // Direct DOM update function - ONLY GPU-friendly properties (transform, opacity)
  // NO left/top/width/height to avoid layout recalculations
  // NO per-frame allocations - all math done with local variables
  const updatePositionsInDOM = useCallback(() => {
    const { x: rotXDeg, y: rotYDeg } = rotationRef.current;

    const rotX = SPHERE_MATH.degreesToRadians(rotXDeg);
    const rotY = SPHERE_MATH.degreesToRadians(rotYDeg);
    const cosX = Math.cos(rotX);
    const sinX = Math.sin(rotX);
    const cosY = Math.cos(rotY);
    const sinY = Math.sin(rotY);

    const basePoints = basePointsRef.current;
    const positions = imagePositions; // for phi to know if it's a pole

    for (let index = 0; index < basePoints.length; index++) {
      const base = basePoints[index];
      const posInfo = positions[index];

      let x = base.x;
      let y = base.y;
      let z = base.z;

      // Rotate around Y
      const x1 = x * cosY + z * sinY;
      const z1 = -x * sinY + z * cosY;
      x = x1;
      z = z1;

      // Rotate around X
      const y2 = y * cosX - z * sinX;
      const z2 = y * sinX + z * cosX;
      y = y2;
      z = z2;

      const element = imageElementsRef.current.get(index);
      if (!element) continue;

      // Visibility / fade
      const fadeZoneStart = -10;
      const fadeZoneEnd = -30;
      const isVisible = z > fadeZoneEnd;
      if (!isVisible) {
        element.style.display = 'none';
        continue;
      }

      let fadeOpacity = 1;
      if (z <= fadeZoneStart) {
        fadeOpacity = Math.max(0, (z - fadeZoneEnd) / (fadeZoneStart - fadeZoneEnd));
      }

      const isPoleImage = posInfo.phi < 30 || posInfo.phi > 150;

      const distanceFromCenter = Math.sqrt(x * x + y * y);
      const maxDistance = actualSphereRadius;
      const distanceRatio = Math.min(distanceFromCenter / maxDistance, 1);

      const distancePenalty = isPoleImage ? 0.4 : 0.7;
      const centerScale = Math.max(0.3, 1 - distanceRatio * distancePenalty);

      const depthScale = (z + actualSphereRadius) / (2 * actualSphereRadius);
      const scale = centerScale * Math.max(0.5, 0.8 + depthScale * 0.3);

      // Hover
      const isHovered = hoveredIndexRef.current === index;
      const hoverScale = isHovered ? 1.2 : 1;
      const finalScale = scale * hoverScale;

      const isImageLoaded = loadedImagesRef.current.has(index);
      // Show subtle placeholder for unloaded images so sphere structure is visible immediately (fixes "takes time" in prod)
      const finalOpacity = fadeOpacity * (isImageLoaded ? 1 : 0.25);

      element.style.opacity = `${finalOpacity}`;
      element.style.zIndex = `${Math.round(1000 + z)}`;
      element.style.display = 'block';

      element.style.transform =
        `translate3d(-50%, -50%, 0) translate3d(${x}px, ${y}px, 0) scale(${finalScale})`;
    }
  }, [imagePositions, actualSphereRadius]);

  const updateMomentum = useCallback(() => {
    // Check dragging via ref - NO state access
    if (isDraggingRef.current) return;

    const currentVelocity = velocityRef.current;
    const newVelocity = {
      x: currentVelocity.x * momentumDecay,
      y: currentVelocity.y * momentumDecay
    };

    // Stop animation if velocity is too low and auto-rotate is off
    if (!autoRotate && Math.abs(newVelocity.x) < 0.01 && Math.abs(newVelocity.y) < 0.01) {
      velocityRef.current = { x: 0, y: 0 };
      // NO setState - just update ref
    } else {
      velocityRef.current = newVelocity;
      // NO setState - just update ref
    }

    const currentRotation = rotationRef.current;
    let newY = currentRotation.y;

    // Add auto-rotation - smooth continuous rotation without gaps
    if (autoRotate) {
      // Continuous rotation - always increment to prevent gaps
      newY += autoRotateSpeed;
    }

    // Add momentum-based rotation
    newY += clampRotationSpeed(newVelocity.y);

    const newRotation = {
      x: SPHERE_MATH.normalizeAngle(currentRotation.x + clampRotationSpeed(newVelocity.x)),
      y: SPHERE_MATH.normalizeAngle(newY),
      z: currentRotation.z
    };

    // CRITICAL: Only update ref - NO setState to avoid re-renders
    rotationRef.current = newRotation;

    // Update DOM directly every frame - bypass React render cycle completely
    updatePositionsInDOM();
  }, [momentumDecay, clampRotationSpeed, autoRotate, autoRotateSpeed, updatePositionsInDOM]);

  // ==========================================
  // EVENT HANDLERS
  // ==========================================
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    // Only update refs - NO setState
    isDraggingRef.current = true;
    velocityRef.current = { x: 0, y: 0 };
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    // Check via ref - NO state access
    if (!isDraggingRef.current) return;

    const deltaX = e.clientX - lastMousePos.current.x;
    const deltaY = e.clientY - lastMousePos.current.y;

    const rotationDelta = {
      x: -deltaY * dragSensitivity,
      y: deltaX * dragSensitivity
    };

    const newRotation = {
      x: SPHERE_MATH.normalizeAngle(rotationRef.current.x + clampRotationSpeed(rotationDelta.x)),
      y: SPHERE_MATH.normalizeAngle(rotationRef.current.y + clampRotationSpeed(rotationDelta.y)),
      z: rotationRef.current.z
    };

    // Only update ref - NO setState
    rotationRef.current = newRotation;

    // Update velocity for momentum
    const newVel = {
      x: clampRotationSpeed(rotationDelta.x),
      y: clampRotationSpeed(rotationDelta.y)
    };
    // Only update ref - NO setState
    velocityRef.current = newVel;

    lastMousePos.current = { x: e.clientX, y: e.clientY };
    updatePositionsInDOM();
  }, [dragSensitivity, clampRotationSpeed, updatePositionsInDOM]);

  const handleMouseUp = useCallback(() => {
    // Only update ref - NO setState
    isDraggingRef.current = false;
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    // Only update refs - NO setState
    isDraggingRef.current = true;
    velocityRef.current = { x: 0, y: 0 };
    lastMousePos.current = { x: touch.clientX, y: touch.clientY };
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    // Check via ref - NO state access
    if (!isDraggingRef.current) return;
    e.preventDefault();
    const touch = e.touches[0];

    const deltaX = touch.clientX - lastMousePos.current.x;
    const deltaY = touch.clientY - lastMousePos.current.y;

    const rotationDelta = {
      x: -deltaY * dragSensitivity,
      y: deltaX * dragSensitivity
    };

    const newRotation = {
      x: SPHERE_MATH.normalizeAngle(rotationRef.current.x + clampRotationSpeed(rotationDelta.x)),
      y: SPHERE_MATH.normalizeAngle(rotationRef.current.y + clampRotationSpeed(rotationDelta.y)),
      z: rotationRef.current.z
    };

    // Only update ref - NO setState
    rotationRef.current = newRotation;

    const newVel = {
      x: clampRotationSpeed(rotationDelta.x),
      y: clampRotationSpeed(rotationDelta.y)
    };
    // Only update ref - NO setState
    velocityRef.current = newVel;

    lastMousePos.current = { x: touch.clientX, y: touch.clientY };
    updatePositionsInDOM();
  }, [dragSensitivity, clampRotationSpeed, updatePositionsInDOM]);

  const handleTouchEnd = useCallback(() => {
    // Only update ref - NO setState
    isDraggingRef.current = false;
  }, []);

  // ==========================================
  // EFFECTS & LIFECYCLE
  // ==========================================
  useEffect(() => {
    // Mount immediately - don't wait for images to load
    setIsMounted(true);
  }, []);

  // Preload all sphere images as soon as we have URLs so they're ready when section is in view (fixes slow appearance in prod)
  useEffect(() => {
    const list = images ?? [];
    if (list.length === 0) return;
    list.forEach((img: ImageData) => {
      const preload = new Image();
      preload.src = img.src;
    });
  }, [images]);

  // Intersection Observer - only start when section is in view
  useEffect(() => {
    if (!isMounted || !containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting);
        });
      },
      {
        threshold: 0.2, // Start when 20% visible
        rootMargin: '50px' // Start slightly before fully in view
      }
    );

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [isMounted]);

  useEffect(() => {
    setImagePositions(generateSpherePositions());
  }, [generateSpherePositions]);

  // Initial DOM update after mount
  useEffect(() => {
    if (isMounted && imagePositions.length > 0) {
      updatePositionsInDOM();
    }
  }, [isMounted, imagePositions.length, updatePositionsInDOM]);

  useEffect(() => {
    // Only start animation when section is in view
    if (!isMounted || images.length === 0 || !isInView) {
      // Stop animation if not in view
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
        animationFrame.current = null;
      }
      return;
    }

    let isRunning = true;
    let isScrolling = false;
    let scrollTimeout: any = null;

    const onScroll = () => {
      isScrolling = true;
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
      }, 100);
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    // Start animation when section comes into view
    const animate = () => {
      if (!isRunning || !isInView || isScrolling) {
        if (isRunning && isInView && isScrolling) {
          animationFrame.current = requestAnimationFrame(animate); // Keep polling without updating DOM
        }
        return;
      }
      updateMomentum();
      animationFrame.current = requestAnimationFrame(animate);
    };

    // Start animation when in view
    animationFrame.current = requestAnimationFrame(animate);

    return () => {
      isRunning = false;
      window.removeEventListener('scroll', onScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
        animationFrame.current = null;
      }
    };
  }, [isMounted, images.length, isInView, updateMomentum]);

  useEffect(() => {
    if (!isMounted) return;
    const container = containerRef.current;
    if (!container) return;

    // Mouse events
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    // Touch events
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isMounted, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

  // ==========================================
  // RENDER HELPERS
  // ==========================================
  const renderImageNode = useCallback((image: ImageData, index: number) => {
    // Initial positions don't matter - JS loop will position them before they become visible
    return (
      <div
        key={image.id}
        ref={(el) => {
          if (el) {
            imageElementsRef.current.set(index, el);
          } else {
            imageElementsRef.current.delete(index);
          }
        }}
        className="absolute cursor-pointer select-none"
        style={{
          // Fixed size and position - NEVER changed during animation
          width: `${baseImageSize}px`,
          height: `${baseImageSize}px`,
          left: '50%',
          top: '50%',
          // Only transform, opacity, zIndex, display will be updated from JS
          opacity: 0,
          transform: 'translate3d(-50%, -50%, 0) scale(0)',
          zIndex: 1,
          willChange: 'transform, opacity',
          transition: 'none',
          display: 'none'
        }}
        onMouseEnter={() => { hoveredIndexRef.current = index; }}
        onMouseLeave={() => { hoveredIndexRef.current = null; }}
        onClick={() => setSelectedImage(image)}
      >
        <div
          className="relative w-full h-full rounded-full overflow-hidden border-2 border-white/30 hover:border-gold-400/80 bg-gray-300/80"
          style={{
            willChange: 'transform, opacity',
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden'
          }}
        >
          <img
            src={image.src}
            alt={image.alt}
            className="w-full h-full object-cover"
            draggable={false}
            loading="eager"
            style={{
              opacity: 0, // Start hidden - will be updated directly in DOM
              display: 'block',
              willChange: 'opacity',
              // Remove heavy CSS effects for smooth animation
              // No box-shadow, filter, or backdrop-filter during animation
            }}
            onError={(e) => {
              console.warn(`Failed to load sphere image ${index}:`, image.src);
              const target = e.target as HTMLImageElement;
              target.style.opacity = '0';
            }}
            onLoad={(e) => {
              // Update opacity directly in DOM - NO React state update to avoid re-renders
              const target = e.target as HTMLImageElement;
              loadedImagesRef.current.add(index);

              // Fade in with staggered delay - direct DOM manipulation
              setTimeout(() => {
                target.style.opacity = '1';
              }, index * 30); // 30ms delay between each image (faster)
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
        </div>
      </div>
    );
  }, [baseImageSize]);

  const renderSpotlightModal = () => {
    if (!selectedImage) return null;

    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        onClick={() => setSelectedImage(null)}
        style={{
          animation: 'fadeIn 0.3s ease-out'
        }}
      >
        <div
          className="bg-dark-800 rounded-xl max-w-md w-full overflow-hidden border border-gold-400/20"
          onClick={(e) => e.stopPropagation()}
          style={{
            animation: 'scaleIn 0.3s ease-out'
          }}
        >
          <div className="relative aspect-square">
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="w-full h-full object-cover"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-2 w-8 h-8 bg-black/50 rounded-full text-white flex items-center justify-center hover:bg-black/70 transition-all cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>
          {(selectedImage.title || selectedImage.description) && (
            <div className="p-6">
              {selectedImage.title && (
                <h3 className="text-xl font-bold mb-2 text-white">{selectedImage.title}</h3>
              )}
              {selectedImage.description && (
                <p className="text-gray-300">{selectedImage.description}</p>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  // ==========================================
  // EARLY RETURNS
  // ==========================================
  if (!isMounted) {
    return (
      <div
        className="bg-gray-100 rounded-lg animate-pulse flex items-center justify-center"
        style={{ width: containerSize, height: containerSize }}
      >
        <div className="text-gray-400">Loading...</div>
      </div>
    );
  }

  if (!images.length) {
    return (
      <div
        className="bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center"
        style={{ width: containerSize, height: containerSize }}
      >
        <div className="text-gray-400 text-center">
          <p>No images provided</p>
          <p className="text-sm">Add images to the images prop</p>
        </div>
      </div>
    );
  }

  // ==========================================
  // MAIN RENDER
  // ==========================================
  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
      <div
        ref={containerRef}
        className={`relative select-none cursor-grab active:cursor-grabbing ${className}`}
        style={{
          width: containerSize,
          height: containerSize,
          perspective: `${perspective}px`,
          willChange: 'transform',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden'
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div className="relative w-full h-full" style={{ zIndex: 10 }}>
          {images.map((image, index) => renderImageNode(image, index))}
        </div>
      </div>
      {renderSpotlightModal()}
    </>
  );
};

export default SphereImageGrid;
