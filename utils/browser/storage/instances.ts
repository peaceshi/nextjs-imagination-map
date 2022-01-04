/**
 * localforage multiple instances
 * @description You can create multiple instances of localForage that point to different stores.
 *  All the configuration options used by config are supported.
 * @url https://localforage.github.io/localForage/#multiple-instances
 */
import localforage from "localforage";

/**
 * createInstance
 * @description Creates a new instance of localForage and returns it.
 *  Each object contains its own database and doesn’t affect other instances of localForage.
 *
 * All the configuration options used by config are supported.
 *
 * You can also create multiple stores that point to the same instance by different storeName.
 * @param options @see LocalForageOptions
 **/
export const createInstance = (options: LocalForageOptions): LocalForage | undefined => {
  try {
    const value = localforage.createInstance(options);
    console.debug(value);
    return value;
  } catch (error) {
    console.error(error);
  }
};
/**
 * dropInstance
 * @description When invoked with no arguments, it drops the “store” of the current instance.
 *
 *  When invoked with an object specifying both name and storeName properties, it drops the specified “store”.
 *
 *  When invoked with an object specifying only a name property, it drops the specified “database” (and all its stores.
 * @param options @see LocalForageDbInstanceOptions
 **/
export const dropInstance = async (options?: LocalForageDbInstanceOptions) => {
  try {
    if (options) {
      await localforage.dropInstance(options);
      console.debug("dropInstance");
    } else {
      await localforage.dropInstance();
      console.debug("dropInstance");
    }
  } catch (error) {
    console.error(error);
  }
};
