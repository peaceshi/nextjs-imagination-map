import useSWR from "swr";

export const fetcher = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Fetch JSON error: {${response.status} :${response.statusText}}`);
  }
  return (await response.json()) as Promise<T>;
};

export const useJSON = <T>(api: string) => {
  const swr = useSWR<T>(api, fetcher, {
    suspense: false
  });
  return swr;
};
export { useJSON as default };
