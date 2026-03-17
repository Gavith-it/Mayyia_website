/**
 * Section-wise image assets.
 * Add or replace images in public/images/<section>/ — see each folder's README.txt.
 * Logo: add public/images/logo/logo.svg or logo.png.
 */

const base = '/images'

export const IMAGE_ASSETS = {
  home: {
    video: `${base}/home/home5.mp4`,
    heroSliders: [
      `${base}/home/0D4A5008.JPG`,
      `${base}/home/0D4A5074.JPG`,
      `${base}/home/10.jpg`,
      `${base}/home/MDR56572.JPG`,
      `${base}/home/MDR56676.JPG`,
    ],
    parallax: [
      `${base}/home/0D4A5008.JPG`,
      `${base}/home/0D4A5074.JPG`,
    ],
    reservationBg: `${base}/home/0D4A3760.JPG`,
    signature: [
      `${base}/home/signature-1.jpg`,
      `${base}/home/signature-2%20(2).JPG`,
      `${base}/home/signature-3%20(3).JPG`,
      `${base}/home/signature-4%20(4).JPG`,
    ],
    gallery: [
      `${base}/home/gallery-1.jpg`,
      `${base}/home/gallery-2.jpg`,
      `${base}/home/gallery-3.jpg`,
      `${base}/home/gallery-4.jpg`,
      `${base}/home/gallery-5.jpg`,
      `${base}/home/gallery-6.jpg`,
      `${base}/home/gallery-7.JPG`,
      `${base}/home/gallery-8.jpg`,
    ],
    /** Our Catering Specialisations slider – Slide 1: SMC 01, 2: tradition (02), 3: fruit/memorable (04), 4: Banner 03 */
    specialisations: [
      `${base}/home/SMC%20Web%20Banner%2001.jpg.jpeg`,
      `${base}/home/Web%20Banner%2004%20copy.jpg.jpeg`,
      `${base}/home/Web%20Banner%2002%20copy.jpg.jpeg`,
      `${base}/home/Web%20Banner%2003%20copy.jpg.jpeg`,
    ],
    /** Our Story sphere – your 12 images in public/images/home/ */
    sphere: [
      `${base}/home/sphere-1.jpg`,
      `${base}/home/sphere-2.JPG`,
      `${base}/home/sphere-3.JPG`,
      `${base}/home/sphere-4.JPG`,
      `${base}/home/sphere-5.JPG`,
      `${base}/home/sphere-6.JPG`,
      `${base}/home/sphere-7.JPG`,
      `${base}/home/sphere-8.JPG`,
      `${base}/home/sphere-9.JPG`,
      `${base}/home/sphere-10.JPG`,
      `${base}/home/sphere-11.JPG`,
      `${base}/home/sphere-12.JPG`,
    ],
  },
  about: {
    hero: `${base}/about/_VG_9679%20copy.jpg`,
    legacy: `${base}/about/legacy.jpg`,
    whatWeDo: [
      `${base}/about/0D4A3274.JPG`,
      `${base}/about/0D4A8280.JPG`,
    ],
    culinary: `${base}/about/VG_05150%20copy.jpg`,
    /** Operational cards: Central Kitchen, Logistics Network, Expert Team, Event SOPs */
    operationalCards: [
      `${base}/about/central-kitchen.jpg`,
      `${base}/about/logistics-network.jpg`,
      `${base}/about/expert-team.JPG`,
      `${base}/about/event-sops.JPG`,
    ],
  },
  menu: {
    hero: `${base}/menu/hero.jpg`,
    sectionBg: `${base}/menu/07.jpg`,
  },
  gallery: {
    hero: `${base}/gallery/hero.jpg`,
    grid: [
      `${base}/gallery/1.jpg`,
      `${base}/gallery/2.jpg`,
      `${base}/gallery/3.jpg`,
      `${base}/gallery/4.jpg`,
      `${base}/gallery/5.jpg`,
      `${base}/gallery/6.jpg`,
      `${base}/gallery/7.jpg`,
      `${base}/gallery/8.jpg`,
      `${base}/gallery/9.jpg`,
    ],
  },
  chefs: {
    hero: `${base}/chefs/hero.jpg`,
    grid: [
      `${base}/chefs/1.jpg`,
      `${base}/chefs/2.jpg`,
      `${base}/chefs/3.jpg`,
      `${base}/chefs/4.jpg`,
    ],
  },
  booking: {
    hero: `${base}/booking/hero.jpg`,
  },
  contact: {
    hero: `${base}/contact/hero.jpg`,
  },
  logo: {
    /** Logo in public/images/logo/ — used in header (link to Home) */
    src: `${base}/logo/Image__9_-removebg-preview.png`,
  },
} as const
