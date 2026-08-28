/**
 * Small pub/sub so animations elsewhere in the app (e.g. the portfolio
 * cover-image curtain wipe) can wait until the preloader has fully
 * finished - curtain lifted, preloader hidden - before they start,
 * instead of racing it and playing while it's still covering the page.
 *
 * `markPreloaderDone()` is called once by PreloaderComponent when its
 * outro timeline completes. `onPreloaderDone()` runs the callback right
 * away if that already happened, otherwise it waits for it - so it's
 * safe to call regardless of which one initializes first.
 */
const EVENT_NAME = 'app:preloader-done';

let done = false;

export function markPreloaderDone(): void {
  if (done) {
    return;
  }
  done = true;
  window.dispatchEvent(new Event(EVENT_NAME));
}

export function onPreloaderDone(callback: () => void): void {
  if (done) {
    callback();
    return;
  }
  window.addEventListener(EVENT_NAME, callback, { once: true });
}