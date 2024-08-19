declare global {
  interface Window {
    gtag: any;
    getDevs: () => void;
    paypal: any;
  }
}
