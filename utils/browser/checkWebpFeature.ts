type WebpImageType = string;
type WebpImageDataBase64 = string;
/**
 * @description Webp ImageKey
 * @param {WebpImageType} key Webp ImageType
 * @param {WebpImageDataBase64} value Webp ImageData
 */
type WebpImageKey = { [key: WebpImageType]: WebpImageDataBase64 };

const testWebpImages: Array<WebpImageKey> = [
  { lossy: "UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA" },
  { lossless: "UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==" },
  {
    alpha:
      "UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA=="
  },
  {
    animation:
      "UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA"
  }
];

const imageData = (key: WebpImageKey): [WebpImageType, WebpImageDataBase64] => {
  const feature = Object.keys(key)[0];
  const value = Object.values(key)[0];
  return [feature, value];
};
const eventHandler = (img: HTMLImageElement, feature: WebpImageType) => {
  if (img.width > 0 && img.height > 0) {
    console.log(`webp: ${feature} is supported.`);
    localStorage.setItem(`webp`, "true");
  } else {
    console.log(`webp: ${feature} is not supported.`);
    localStorage.setItem(`webp`, "false");
  }
};

const checkImage = (key: WebpImageKey) => {
  const [feature, value] = imageData(key);
  console.log(`test webp support: {${feature}: ${value}}`);
  const img = new Image();
  img.src = `data:image/webp;base64,${value}`;
  img.addEventListener("load", () => eventHandler(img, feature), { once: true });
  img.addEventListener("error", () => console.error(`webp is not supported`), { once: true });
};
/**
 * @description check if webp is supported.
 * @description make sure your function is being called in client side only.
 */
export const checkWebpFeature = async (): Promise<void> => {
  if (typeof window !== "undefined") {
    // Because of the way Next.js handles SSR,
    // make sure your function is being called in client side only.
    if (localStorage.getItem("webp") == "true") {
      return;
    } else {
      for await (const key of testWebpImages) {
        checkImage(key);
      }
    }
  }
};

export default checkWebpFeature;
