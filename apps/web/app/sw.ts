/* eslint-disable  @typescript-eslint/no-explicit-any */
import { defaultCache } from '@serwist/next/worker';
import type { PrecacheEntry, SerwistGlobalConfig } from 'serwist';
import { Serwist } from 'serwist';

// This declares the value of `injectionPoint` to TypeScript.
// `injectionPoint` is the string that will be replaced by the
// actual precache manifest. By default, this string is set to
// `"self.__SW_MANIFEST"`.
declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    addEventListener(arg0: string, arg1: (event: any) => void): unknown;
    clients: any;
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}


declare const self: WorkerGlobalScope;

const serwist = new Serwist({

  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: defaultCache,
});

serwist.addEventListeners();