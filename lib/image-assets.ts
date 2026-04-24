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
      `${base}/Curated%20Catering%20Experiences%2002%201100x500/SMC%20Website%20Designs%20%2001%201100x500.jpg`,
      `${base}/Curated%20Catering%20Experiences%2002%201100x500/SMC%20Website%20Designs%20%2002%201100x500.jpg`,
      `${base}/Curated%20Catering%20Experiences%2002%201100x500/SMC%20Website%20Designs%20%2003%201100x500.jpg`,
      `${base}/Curated%20Catering%20Experiences%2002%201100x500/SMC%20Website%20Designs%20%2004%20%201100x500.jpg`,
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
      `${base}/our%20story/sphere-1.jpg`,
      `${base}/our%20story/sphere-2.jpg`,
      `${base}/our%20story/sphere-3.jpg`,
      `${base}/our%20story/sphere-4.jpg`,
      `${base}/our%20story/sphere-5.jpg`,
      `${base}/our%20story/sphere-6.jpg`,
      `${base}/our%20story/sphere-7.jpg`,
      `${base}/our%20story/sphere-8.jpg`,
      `${base}/our%20story/sphere-9.jpg`,
      `${base}/our%20story/sphere-10.jpg`,
      `${base}/our%20story/sphere-11.jpg`,
      `${base}/our%20story/sphere-12.jpg`,
      `${base}/our%20story/0D4A0772.jpg`,
      `${base}/our%20story/0D4A1780.jpg`,
      `${base}/our%20story/0D4A7149.jpg`,
      `${base}/our%20story/0D4A7691.jpg`,
      `${base}/our%20story/0D4A8208.jpg`,
      `${base}/our%20story/31%20(2).jpg`,
      `${base}/our%20story/62%20(1).jpg`,
      `${base}/our%20story/MDR56718.jpg`,
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
    bentoGrid: [
      `${base}/menu/centre.jpg`,
      `${base}/menu/1.jpg`,
      `${base}/menu/2.JPG`,
      `${base}/menu/3.JPG`,
      `${base}/menu/4.JPG`,
      `${base}/menu/5.JPG`,
      `${base}/menu/6.JPG`,
      `${base}/menu/7.JPG`,
      `${base}/menu/8.JPG`,
    ],
    sectionBg: `${base}/menu/07.jpg`,
  },
  gallery: {
    hero: `${base}/Gallery.JPG`,
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
    categories: [
      {
        name: "Events",
        images: [
          { src: `${base}/Events/Corporate Events.jpg`, title: "Corporate Events" },
          { src: `${base}/Events/Cultural Events.jpg`, title: "Cultural Events" },
          { src: `${base}/Events/Events.jpg`, title: "Events" },
          { src: `${base}/Events/Sports  Events.jpg`, title: "Sports Events" },
          { src: `${base}/Events/Weddings.jpg`, title: "Weddings" },
        ]
      },
      {
        name: "Safety & Hygiene",
        images: [
          { src: `${base}/Safety & Hygiene/Equipment Safety.jpg`, title: "Equipment Safety" },
          { src: `${base}/Safety & Hygiene/Food Safety.jpg`, title: "Food Safety" },
          { src: `${base}/Safety & Hygiene/Kitchen Hygiene.jpg`, title: "Kitchen Hygiene" },
          { src: `${base}/Safety & Hygiene/Personal Hygiene.jpg`, title: "Personal Hygiene" },
          { src: `${base}/Safety & Hygiene/Safety & Hygiene copy.jpg`, title: "Safety & Hygiene" },
          { src: `${base}/Safety & Hygiene/Serving Hygiene.jpg`, title: "Serving Hygiene" },
        ]
      },
      {
        name: "Servings",
        images: [
          { src: `${base}/Servings/Banana Leaf Service.jpg`, title: "Banana Leaf Service" },
          { src: `${base}/Servings/Buffet Service.jpg`, title: "Buffet Service" },
          { src: `${base}/Servings/Family Style Service.jpg`, title: "Family Style Service" },
          { src: `${base}/Servings/Gold plate service.jpg`, title: "Gold Plate Service" },
          { src: `${base}/Servings/Live Counter Service.jpg`, title: "Live Counter Service" },
          { src: `${base}/Servings/Plate Service.jpg`, title: "Plate Service" },
          { src: `${base}/Servings/Servings copy.jpg`, title: "Servings" },
        ]
      },
      {
        name: "Staff",
        images: [
          { src: `${base}/Staff/Kitchen Staff.jpg`, title: "Kitchen Staff" },
          { src: `${base}/Staff/Management Staff.jpg`, title: "Management Staff" },
          { src: `${base}/Staff/Service Staff.jpg`, title: "Service Staff" },
          { src: `${base}/Staff/Staff copy.jpg`, title: "Staff" },
        ]
      }
    ]
  },
  chefs: {
    hero: `${base}/chefs.JPG`,
    grid: [
      `${base}/chefs/1.jpg`,
      `${base}/chefs/2.jpg`,
      `${base}/chefs/3.jpg`,
      `${base}/chefs/4.jpg`,
    ],
  },
  booking: {
    hero: `${base}/caterers.JPG`,
  },
  contact: {
    hero: `${base}/contact1.png`,
  },
  logo: {
    /** Logo in public/images/logo/ — used in header (link to Home) */
    src: `${base}/logo/Image__9_-removebg-preview.png`,
  },
} as const
