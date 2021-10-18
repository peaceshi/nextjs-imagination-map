/**
 * @url: https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerContainer
 * @param serviceWorker ServiceWorkerContainer
 */
const serviceWorkerState = (serviceWorker: ServiceWorkerContainer): void => {
  // Independent of the registration, let's also display
  // information about whether the current page is controlled
  // by an existing service worker, and when that
  // controller changes.

  // First, do a one-off check if there's currently a
  // service worker in control.
  if (serviceWorker.controller) {
    console.log("This page is currently controlled by:", serviceWorker.controller);
    console.log(`Service worker is ${serviceWorker.controller?.state}`);
    serviceWorker.addEventListener("controllerchange", () => {
      console.log("This page is now controlled by:", serviceWorker.controller);
    });
  } else {
    console.log("No service worker is controlling this page");
  }
};
/**
 * @url: https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration
 * @param serviceWorker ServiceWorkerContainer
 */
const serviceWorkerUpdate = async (serviceWorker: ServiceWorkerContainer): Promise<void> => {
  await serviceWorker.ready.then((registration) => {
    registration.addEventListener("updatefound", () => {
      console.log("Newer version is available");
      alert("Newer version is available. Reload page to apply changes.");
    });
    return;
  });
};
const NotificationMessage = {
  title: "Notification",
  options: {
    body: "Notification",
    icon: "/icons/android-chrome-192x192.png",
    badge: "/icons/maskable_icon_x128.png",
    tag: "Notification"
  }
};
const serviceWorkershowNotification = async (serviceWorker: ServiceWorkerContainer): Promise<void> => {
  await serviceWorker.ready
    .then((registration) => {
      void registration.showNotification(NotificationMessage.title, NotificationMessage.options);
      return;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

const serviceWorkerNotification = async (serviceWorker: ServiceWorkerContainer): Promise<void> => {
  await Notification.requestPermission((result) => {
    if (result === "granted") {
      void serviceWorkershowNotification(serviceWorker);
    } else {
      throw new Error("We weren't granted notification permission.");
    }
  });
};
export const pwaHelper = (): void => {
  if (typeof window !== "undefined") {
    // Because of the way Next.js handles SSR,
    // make sure your function is being called in client side only.
    console.log(`pwaHelper`);
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        serviceWorkerState(navigator.serviceWorker);
        void serviceWorkerUpdate(navigator.serviceWorker);
        // void serviceWorkerNotification(navigator.serviceWorker);
      });
    } else {
      console.error(`ServiceWorker not supported`);
    }
  }
};

export default pwaHelper;
