/**
 * localforage settings
 * @description These methods allow driver selection and database configuration.
 *  These methods should generally be called before the first data API call to localForage (i.e. before you call getItem() or length(), etc.)
 * @url https://localforage.github.io/localForage/#settings-api
 */
import localforage from "localforage";

/**
 * setDriver
 * @description Force usage of a particular driver or drivers, if available.
 *
 * By default, localForage selects backend drivers for the datastore in this order:
 * 1. IndexedDB `localforage.INDEXEDDB`
 * 2. WebSQL `localforage.WEBSQL`
 * 3. localStorage `localforage.LOCALSTORAGE`
 * @param driverName
 */
export const setDriver = async (driverName: string | string[]) => {
  try {
    await localforage.setDriver(driverName);
    console.log("set storage driver.");
  } catch (error) {
    console.error(error);
  }
};
/**
 * **`Synchronous API`** setConfig
 * @description **`localforage._ready = null;`**
 *
 * Set and persist localForage options. This must be called before any other calls to localForage are made, but can be called after localForage is loaded.
 *
 * If you set any config values with this method they will persist after driver changes, so you can call `config()` then `setDriver()`
 *
 * `driver` : The preferred driver(s) to use.
 *
 * Default: `[localforage.INDEXEDDB, localforage.WEBSQL, localforage.LOCALSTORAGE]`
 *
 * `name` : The name of the database. May appear during storage limit prompts. Useful to use the name of your app here.
 *  In localStorage, this is used as a key prefix for all keys stored in localStorage.
 *
 * Default: `'localforage'`
 *
 * `storeName` : The name of the datastore. In IndexedDB this is the `dataStore`, in WebSQL this is the name of the key/value table in the database.
 *  **Must be alphanumeric, with underscores. Any non-alphanumeric characters will be converted to underscores.**
 *
 * Default: `'keyvaluepairs'`
 *
 * @param options @see LocalForageOptions
 */
export const setConfig = (options?: LocalForageOptions) => {
  try {
    // @ts-expect-error: The library is not exported it.
    // eslint-disable-next-line unicorn/no-null
    localforage._ready = null;
    if (options) {
      const value = localforage.config(options);
      console.debug(value);
    } else {
      const value = localforage.config();
      console.debug(value);
    }
  } catch (error) {
    console.error(error);
  }
};
type Config = "driver" | "size" | "version" | "description" | "name" | "storeName";
/**
 * **`Synchronous API`** getConfig
 * @description Get the current configuration of localForage.
 *
 * @param string `"driver"` | `"size"` | `"version"` | `"description"` | `"name"` | `"storeName"`
 */
export const getConfig = (string?: Config) => {
  try {
    if (string) {
      const value = localforage.config(string) as string | string[] | number;
      console.debug(value);
      return value;
    } else {
      const value = localforage.config();
      console.debug(value);
      return value;
    }
  } catch (error) {
    console.error(error);
  }
};
