/**
 * localforage driver
 * @url https://localforage.github.io/localForage/#driver-api
 */
import localforage from "localforage";

/**
 * getCurrentUsedDriver
 * @description Returns the name of the driver being used.
 */
export const getCurrentUsedDriver = () => {
  try {
    const value = localforage.driver();
    console.debug(value);
    return value;
  } catch (error) {
    console.error(error);
  }
};
/**
 * isDriverReady
 * @description Returns a promise that is resolved if the driver is available. If the driver is not available, the promise will be rejected.
 */
export const isDriverReady = async () => {
  try {
    await localforage.ready();
    console.debug("localforage is ready");
  } catch (error) {
    console.error(error);
  }
};
/**
 * isDriverSupported
 * @description Whether the driverName is supported by the browser.
 * @param driverName
 * @returns boolean
 */
export const isDriverSupported = (driverName: string) => {
  try {
    const value = localforage.supports(driverName);
    console.debug(value);
    return value;
  } catch (error) {
    console.error(error);
  }
};
