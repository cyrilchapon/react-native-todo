import {
  AsyncStringStorage,
  SyncStringStorage,
  AsyncStorage as AsyncStorageInterface,
  SyncStorage as SyncStorageInterface,
} from "jotai/vanilla/utils/atomWithStorage";
import { ZodTypeDef, z } from "zod";

export const createValidatedAsyncJSONStorage =
  <Value, Input>(schema: z.ZodType<Value, ZodTypeDef, Input>) =>
  (
    getUnderlyingStorage: () => AsyncStringStorage
  ): AsyncStorageInterface<Value> => {
    const underlyingStorage = getUnderlyingStorage();

    const internalStorage: AsyncStorageInterface<Value> = {
      getItem: async (key, initialValue) => {
        const _storedValue = await underlyingStorage.getItem(key);

        try {
          const storedValue = JSON.parse(_storedValue ?? "null");
          const parsedStoredValue = schema.parse(storedValue);
          return parsedStoredValue;
        } catch (err) {
          console.error(
            `Error while parsing storage value '${key}', defaulting to initialValue`
          );
          console.error(err);
          return initialValue;
        }
      },
      setItem: async (key, value) =>
        underlyingStorage.setItem(key, JSON.stringify(value)),
      removeItem: underlyingStorage.removeItem,
    };

    return internalStorage;
  };

export const createValidatedSyncJSONStorage =
  <Value>(schema: z.ZodType<Value>) =>
  (
    getUnderlyingStorage: () => SyncStringStorage
  ): SyncStorageInterface<Value> => {
    const underlyingStorage = getUnderlyingStorage();

    const internalStorage: SyncStorageInterface<Value> = {
      getItem: (key, initialValue) => {
        const _storedValue = underlyingStorage.getItem(key);

        try {
          const storedValue = JSON.parse(_storedValue ?? "null");
          const parsedStoredValue = schema.parse(storedValue);
          return parsedStoredValue;
        } catch (err) {
          console.error(
            `Error while parsing storage value '${key}', defaulting to initialValue`
          );
          console.error(err);
          return initialValue;
        }
      },
      setItem: (key, value) =>
        underlyingStorage.setItem(key, JSON.stringify(value)),
      removeItem: underlyingStorage.removeItem,
    };

    return internalStorage;
  };
