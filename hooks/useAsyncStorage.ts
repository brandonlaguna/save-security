import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type UseAsyncStorageReturn<T> = {
  storedValue: T | null;
  setValue: (value: T | ((val: T | null) => T)) => Promise<void>;
  removeValue: () => Promise<void>;
  loading: boolean;
  error: Error | null;
};

const useAsyncStorage = <T>(
  key: string,
  initialValue: T
): UseAsyncStorageReturn<T> => {
  const [storedValue, setStoredValue] = useState<T | null>(initialValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Cargar el valor inicial desde AsyncStorage
  useEffect(() => {
    const loadStoredValue = async () => {
      try {
        const item = await AsyncStorage.getItem(key);
        setStoredValue(item ? JSON.parse(item) : initialValue);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    loadStoredValue();
  }, [key, initialValue]);

  // Guardar un valor en AsyncStorage
  const setValue = async (value: T | ((val: T | null) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      await AsyncStorage.setItem(key, JSON.stringify(valueToStore));
      console.log(
        "🚀 ~ setValue ~ valueToStore:",
        JSON.stringify(valueToStore)
      );
      setStoredValue(valueToStore);
    } catch (err) {
      setError(err as Error);
    }
  };

  // Eliminar el valor de AsyncStorage
  const removeValue = async () => {
    try {
      await AsyncStorage.removeItem(key);
      setStoredValue(null);
    } catch (err) {
      setError(err as Error);
    }
  };

  return { storedValue, setValue, removeValue, loading, error };
};

export default useAsyncStorage;
