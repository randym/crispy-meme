export const request = async (
  path: string,
  options?: {
    params?: Record<string, any>;
    transformer?: { transform: (json: any) => any };
    fetchOptions?: RequestInit;
  },
) => {
  const url = new URL(path, window.location.origin);
  const { searchParams } = url;
  const { params = {}, fetchOptions = {} } = options || {};

  for (const [key, value] of Object.entries(params)) {
    [value].flat().forEach((item) => {
      searchParams.set(key, item.toString());
    });
  }

  Object.assign(fetchOptions, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  return fetch(url, fetchOptions)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Network request failed: ${res.statusText}`);
      }
      return res.json();
    })
    .then((json) => {
      return options?.transformer?.transform(json) || json;
    })
    .catch((e) => {
      console.error("Error remote fetching data", e);
      throw e;
    });
};
