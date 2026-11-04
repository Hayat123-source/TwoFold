const PEXELS_BASE = 'https://images.pexels.com/photos';

export interface LandingPhoto {
  id: string;
  alt: string;
  photographer: string;
}

export function photoUrl(photo: LandingPhoto, width: number): string {
  return `${PEXELS_BASE}/${photo.id}/pexels-photo-${photo.id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`;
}

export const PHOTOS = {
  heroCouple: {
    id: '2912695',
    alt: 'Joyful young Indian couple sharing a laugh outdoors on a summer day',
    photographer: 'Shubham Sharma',
  },
  introCouple: {
    id: '7495768',
    alt: 'Happy couple sharing a joyful moment in a vibrant cafe',
    photographer: 'Manik Mandal',
  },
  cafeCoffee: {
    id: '30488157',
    alt: 'Happy couple enjoying a warm moment together in a cosy cafe',
    photographer: 'Basith Nazeer',
  },
  laughingCouple: {
    id: '12247880',
    alt: 'Happy young couple enjoying a playful moment sitting together outdoors',
    photographer: 'Ekam Juneja',
  },
  cityWalk: {
    id: '37045028',
    alt: 'Couple walking hand in hand on a bright day in Mumbai',
    photographer: 'upender photography',
  },
  candidMoment: {
    id: '6533356',
    alt: 'Romantic couple looking at each other while strolling through the city',
    photographer: 'Budgeron Bach',
  },
  audienceProfessional: {
    id: '6102858',
    alt: 'Portrait of a joyful young man with a beard in a casual indoor setting',
    photographer: 'Henlynn',
  },
  audienceAdult: {
    id: '8720868',
    alt: 'Close-up portrait of a smiling young woman in a denim jacket',
    photographer: 'Ravi Roshan',
  },
  audienceExplorer: {
    id: '8551280',
    alt: 'Two young adults relaxing on a sofa, enjoying a casual moment together',
    photographer: 'Pavel Danilyuk',
  },
  audienceConnections: {
    id: '9497059',
    alt: 'Young couple holding hands while walking on a sunny day',
    photographer: 'Ron Lach',
  },
  galleryNightlife: {
    id: '8041394',
    alt: 'Young adults dancing and enjoying the nightlife in a club',
    photographer: 'ANTONI SHKRABA production',
  },
  galleryPub: {
    id: '5054664',
    alt: 'Group of friends socialising over drinks in a cosy pub',
    photographer: 'Ketut Subiyanto',
  },
  galleryToast: {
    id: '6531455',
    alt: 'Friends raising glasses in a cheerful toast during a lively party',
    photographer: 'cottonbro studio',
  },
  galleryPool: {
    id: '11185951',
    alt: 'Group of adults smiling and holding drinks by a swimming pool at night',
    photographer: 'vii wolves',
  },
  gallerySkate: {
    id: '5225146',
    alt: 'Smiling couple walking close together along a city sidewalk',
    photographer: 'Samson Katt',
  },
  galleryPortrait: {
    id: '34719524',
    alt: 'Portrait of a young woman smiling in vibrant pink attire outdoors',
    photographer: 'Sayantan Dhar',
  },
  ctaCouple: {
    id: '37878873',
    alt: 'Young couple walking hand in hand down a sunny urban street',
    photographer: 'Orkhan Sweden',
  },
} satisfies Record<string, LandingPhoto>;
