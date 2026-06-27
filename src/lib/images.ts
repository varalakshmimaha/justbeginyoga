// Central map from the design's image-slot ids to real files.
// Extracted photos live in /public/assets/slots; a few slots that were never
// filled in the design fall back to the closest /public/assets photo.
export const IMG = {
  // Home (Just Begin Yoga.dc.html)
  "jb-hero-breath": "/assets/breath.jpeg",
  "jb-banner2": "/assets/river-pose.jpeg",
  "jb-gc-1": "/assets/slots/jb-group-class.webp",
  "jb-whyyoga": "/assets/whyyoga-group.png",
  "jb-services-center": "/assets/slots/jb-services-center.webp",
  "jb-style-vinyasa": "/assets/slots/jb-style-vinyasa.webp",
  "jb-style-hatha": "/assets/slots/jb-style-hatha.webp",
  "jb-style-power": "/assets/slots/jb-style-power.webp",
  "jb-style-prenatal": "/assets/slots/jb-style-prenatal.webp",
  "jb-style-pranayama": "/assets/slots/jb-style-pranayama.webp",
  "jb-style-yin": "/assets/slots/jb-style-yin.webp",
  "jb-style-face": "/assets/slots/jb-style-face.webp",
  "jb-style-alignment": "/assets/slots/jb-style-alignment.webp",

  // Services (Services.dc.html)
  "svc-personal": "/assets/slots/svc-personal.webp",
  "svc-group": "/assets/slots/svc-group.webp",
  "svc-apartment": "/assets/slots/svc-apartment.webp",
  "svc-corporate": "/assets/slots/svc-corporate.webp",
  "svc-feature": "/assets/slots/svc-feature.webp",

  // Class detail pages
  "jb-personal-hero": "/assets/slots/jb-personal-hero.webp",
  "jb-personal-who": "/assets/slots/jb-personal-who.webp",
  "jb-apt-hero": "/assets/apartment-class.jpeg",
  "jb-corp-hero": "/assets/slots/jb-corp-photo.webp",
  "jb-corp-photo": "/assets/slots/jb-corp-photo.webp",
  "jb-group-laptop": "/assets/group-class-laptop.png",

  // About
  "anusha-founder": "/assets/anusha-founder.jpeg",

  // Misc
  "jb-phonepe-qr": "/assets/slots/jb-phonepe-qr.webp",
} as const;

export type ImageSlot = keyof typeof IMG;
