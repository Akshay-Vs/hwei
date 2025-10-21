export const TEST_CONFIG = {
  api: {
    baseUrl: process.env.API_BASE_URL,
    timeout: 10000
  },
  store: {
    defaultId: process.env.TEST_STORE_ID
  },
  assets: {
    images: {
      default: 'https://images.pexels.com/photos/41162/moon-landing-apollo-11-nasa-buzz-aldrin-41162.jpeg',
      alternate: 'https://images.pexels.com/photos/73910/mars-mars-rover-space-travel-robot-73910.jpeg',
      product1: 'https://images.pexels.com/photos/8940752/pexels-photo-8940752.jpeg',
      product2: 'https://images.pexels.com/photos/7883518/pexels-photo-7883518.jpeg',
      product3: 'https://images.pexels.com/photos/7883511/pexels-photo-7883511.jpeg',
      thumbnail1: 'https://images.pexels.com/photos/45206/roofing-tile-red-wall-45206.jpeg',
      thumbnail2: 'https://images.pexels.com/photos/2288849/pexels-photo-2288849.jpeg',
    }
  },
  cleanup: {
    enabled: true,
    retryOnFailure: true,
    maxRetries: 3
  }
};

