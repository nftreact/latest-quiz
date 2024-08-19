export const consentGrantedAdStorage = (value: 'granted' | 'denied') => {
  window.gtag('consent', 'update', {
    ad_storage: 'granted',
  });
};
