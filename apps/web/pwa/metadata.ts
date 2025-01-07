import { Metadata } from 'next';

const APP_NAME = 'HWEI';
const APP_DEFAULT_TITLE = 'hwei';
const APP_TITLE_TEMPLATE = '%s - PWA App';
const APP_DESCRIPTION = 'E-commerce headless dashboard';
const APP_URL = 'https://hwei.akvs.dev';
const APP_IMAGE = '/og-image.png';

export const myMetadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: '/manifest.json',
  themeColor: '#ffffff',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: APP_DEFAULT_TITLE,
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    url: APP_URL,
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
    images: [
      {
        url: APP_IMAGE,
        width: 1200,
        height: 630,
        alt: `${APP_NAME} Open Graph Image`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@akvs',
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
    images: [APP_IMAGE],
  },
  viewport: 'width=device-width, initial-scale=1, viewport-fit=cover',
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
  alternates: {
    canonical: APP_URL,
    languages: {
      'en-US': `${APP_URL}/en-us`,
    },
  },
  verification: {
    google: 'google-site-verification-code', // Replace
  },
};
