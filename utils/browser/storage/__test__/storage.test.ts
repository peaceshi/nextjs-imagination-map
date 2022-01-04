import localforage from "localforage";
import * as storage from "..";

const defaultConfig = (() => storage.getConfig() as Required<LocalForageOptions>)();
console.debug(defaultConfig);
const supportedDrivers = (() => {
  const drivers = [];
  for (const driver of defaultConfig.driver) {
    storage.isDriverSupported(driver) ? drivers.push(driver) : console.warn(`${driver} is not supported.`);
  }
  return drivers;
})();
const customConfig = {
  ...defaultConfig,
  description: "description",
  name: "customConfig",
  storeName: "storeName",
  version: 2
};
const instanceConfig1 = { ...customConfig, name: "createInstance1" };
const instanceConfig2 = { ...customConfig, name: "createInstance2" };
void (() => console.debug(supportedDrivers))();
describe("Storage config", () => {
  // @ts-expect-error: The library is not exported it.
  // eslint-disable-next-line unicorn/no-null
  beforeEach(() => (localforage._ready = null));
  test("defaultConfig", async () => {
    storage.setConfig();
    expect(storage.getConfig()).toEqual(defaultConfig);
    await storage.isDriverReady();
    expect(storage.getConfig("driver")).toBe(storage.getCurrentUsedDriver());
  });
  test("customConfig", async () => {
    storage.setConfig(customConfig);
    expect(storage.getConfig()).toEqual(customConfig);
    await storage.isDriverReady();
    expect(storage.getConfig("driver")).toBe(storage.getCurrentUsedDriver());
  });
  test("setDriver", async () => {
    storage.setConfig(customConfig);
    expect(storage.getConfig()).toEqual(customConfig);
    await storage.setDriver(supportedDrivers[0]);
    expect(storage.getConfig("driver")).toBe(supportedDrivers[0]);
  });
});
describe("Storage items", () => {
  //@ts-expect-error: The library is not exported it.
  // eslint-disable-next-line unicorn/no-null
  beforeEach(() => ((localforage._ready = null), storage.setConfig()));
  test("get set string", async () => {
    await storage.setItem("string", "testString");
    expect(await storage.getItem("string")).toBe("testString");
  });
  test("removeItem", async () => {
    await storage.setItem("string", "testString");
    expect(await storage.getItem("string")).toBe("testString");
    await storage.removeItem("string");
    expect(await storage.getItem("string")).toBeNull();
  });
  test("clearStorage", async () => {
    await storage.setItem("string", "testString");
    expect(await storage.getItem("string")).toBe("testString");
    await storage.clearStorage();
    expect(await storage.getItem("string")).toBeNull();
  });
  test("Key-Values", async () => {
    await storage.setItem("string", "testString");
    await storage.setItem("number", 7355608); // Custom Bomb!
    expect(await storage.getItem("string")).toBe("testString");
    expect(await storage.getItem("number")).toBe(7355608);
    expect(await storage.getNumberOfKeys()).toBe(2);
    expect(await storage.getKeyNameByIndex(1)).toBe("number");
    expect(await storage.getKeyNames()).toEqual(["string", "number"]);
    expect(await storage.getKeyNames()).not.toEqual(["number", "string"]);
  });
});
const iterator = (value: unknown, key: string, iterationNumber: number) => {
  if (iterationNumber < 2) {
    console.debug([key, value]);
  } else {
    return [key, value];
  }
  console.debug([key, value]);
};
describe("Storage iterator", () => {
  //@ts-expect-error: The library is not exported it.
  // eslint-disable-next-line unicorn/no-null
  beforeEach(() => ((localforage._ready = null), storage.setConfig()));

  test("iterateStorage", async () => {
    await storage.setItem("string", "testString");
    await storage.setItem("number", 7355608); // Custom Bomb!
    expect(await storage.getItem("string")).toBe("testString");
    expect(await storage.getItem("number")).toBe(7355608);
    expect(await storage.getNumberOfKeys()).toBe(2);
    expect(await storage.getKeyNameByIndex(1)).toBe("number");
    expect(await storage.getKeyNames()).toEqual(["string", "number"]);
    expect(await storage.getKeyNames()).not.toEqual(["number", "string"]);
    expect(await storage.iterator((value, key, iterationNumber) => iterator(value, key, iterationNumber))).toEqual([
      "number",
      7355608
    ]);
  });
});
describe("Storage instance", () => {
  //@ts-expect-error: The library is not exported it.
  // eslint-disable-next-line unicorn/no-null
  beforeEach(() => (localforage._ready = null));
  test("createInstance", () => {
    const instance1 = storage.createInstance(instanceConfig1) as LocalForage;
    const instance2 = storage.createInstance(instanceConfig2) as LocalForage;
    expect(instance1.config()).toEqual(instanceConfig1);
    expect(instance2.config()).toEqual(instanceConfig2);
  });
  test("dropInstance", async () => {
    const instance1 = storage.createInstance(instanceConfig1) as LocalForage;
    const instance2 = storage.createInstance(instanceConfig2) as LocalForage;
    expect(instance1.config()).toEqual(instanceConfig1);
    expect(instance2.config()).toEqual(instanceConfig2);

    await instance1.setItem("string", "testString");
    await instance1.setItem("number", 7355608); // Custom Bomb!
    await instance2.setItem("string", "testString2");
    await instance2.setItem("number", 8065537); // Bomb Custom!

    expect(await instance1.getItem("string")).toBe("testString");
    expect(await instance1.getItem("number")).toBe(7355608);

    await storage.dropInstance({ name: instanceConfig1.name });
    expect(await instance1.getItem("string")).toBeNull();
    expect(await instance1.getItem("number")).toBeNull();
    expect(await instance2.getItem("string")).toBe("testString2");
    expect(await instance2.getItem("number")).toBe(8065537);

    await storage.dropInstance({ name: instanceConfig2.name });
    expect(await instance2.getItem("string")).toBeNull();
    expect(await instance2.getItem("number")).toBeNull();
  });
});
