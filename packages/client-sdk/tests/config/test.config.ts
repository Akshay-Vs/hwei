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
      alternate: 'https://images.pexels.com/photos/73910/mars-mars-rover-space-travel-robot-73910.jpeg'
    }
  },
  cleanup: {
    enabled: true,
    retryOnFailure: true,
    maxRetries: 3
  }
};

