type WebpImageFeature = string;
type WebpImageDataBase64 = string;
/**
 * @description Webp ImageObject
 * @param {WebpImageFeature} key Webp ImageFeature
 * @param {WebpImageDataBase64} value Webp ImageData
 */
type WebpImageObject = { [key: WebpImageFeature]: WebpImageDataBase64 };

const testWebpImages: Array<WebpImageObject> = [
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

const imageData = (object: WebpImageObject): [WebpImageFeature, WebpImageDataBase64] => {
  const feature = Object.keys(object)[0];
  const value = Object.values(object)[0];
  return [feature, value];
};
const eventHandler = (img: HTMLImageElement, feature: WebpImageFeature) => {
  if (img.width > 0 && img.height > 0) {
    console.log(`webp: ${feature} is supported.`);
    localStorage.setItem(`webp`, "true");
  } else {
    console.error(`webp: ${feature} is not supported.`);
    localStorage.setItem(`webp`, "false");
  }
};

const checkImage = async (images: WebpImageObject[]) => {
  for await (const key of images) {
    const [feature, value] = imageData(key);
    console.log(`test webp support: {${feature}: ${value}}`);
    const img = new Image();
    img.src = `data:image/webp;base64,${value}`;
    img.addEventListener("load", () => eventHandler(img, feature), { once: true });
    img.addEventListener("error", () => console.error(`webp is not supported`), { once: true });
  }
};
/**
 * @description check if webp is supported.
 * @description make sure your function is being called in client side only.
 */
export const checkWebpFeature = async (): Promise<void> => {
  if (typeof window !== "undefined") {
    // Because of the way Next.js handles SSR,
    // make sure your function is being called in client side only.
    localStorage.getItem("webp") ?? (await checkImage(testWebpImages));
  }
};

export default checkWebpFeature;
