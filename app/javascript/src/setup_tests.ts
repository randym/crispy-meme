import "whatwg-fetch";
import cities from "../../../test/fixtures/files/serializations/cities.json";
import households from "../../../test/fixtures/files/serializations/households.json";

import { Cities, Households } from "./routes";
type MockResponses = {
  [key: string]: any;
};

let mockFetch = (mockResponses: MockResponses): (() => void) => {
  const realFetch = global.fetch;

  global.fetch = jest.fn((input: URL | RequestInfo, options?: RequestInit) => {
    const url = typeof input === "string" ? input : input.toString();
    for (const [key, response] of Object.entries(mockResponses)) {
      if (url.includes(key)) {
        return Promise.resolve(
          new Response(JSON.stringify(response), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          }),
        );
      }
    }
    return realFetch(input, options);
  });

  return () => {
    global.fetch = realFetch;
  };
};
let restoreFetch = mockFetch({
  [Households.path]: households,
  [Cities.path]: cities,
});

afterAll(() => {
  restoreFetch();
});
