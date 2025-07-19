import { http as mswHttp, HttpHandler } from "msw";
import type { MockCase } from "../domain/MockCase";
import {
  useMockApiOnOffStore,
  useMockApiStore,
  type ApiInfo,
} from "../zustand";

type PresetFunction = (
  apiTitle: string,
  ...mockCase: Array<MockCase>
) => HttpHandler;

export const http = {
  head: mswHttp.head,
  all: mswHttp.all,
  get: (
    url: string,
    resolver: Parameters<typeof mswHttp.get>[1],
    options?: Parameters<typeof mswHttp.get>[2]
  ): HttpHandler & { preset: PresetFunction } => {
    const handler = mswHttp.get(url, resolver, options);
    const preset: PresetFunction = (apiTitle, ...mockCase) => {
      const setApi = useMockApiStore.getState().setApi;
      const setApiOnOff = useMockApiOnOffStore.getState().setApiOnOff;

      const newApiInfo: ApiInfo = {
        apiKey: `GET_${url}`,
        method: "GET",
        url: url,
        apiTitle,
        mockCase,
      };

      setApi(newApiInfo);
      setApiOnOff(newApiInfo.apiKey, false);

      return handler;
    };

    return Object.assign(handler, { preset });
  },
  post: mswHttp.post,
  put: mswHttp.put,
  patch: mswHttp.patch,
  delete: mswHttp.delete,
  options: mswHttp.options,
};
