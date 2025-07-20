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
    path: string,
    resolver: Parameters<typeof mswHttp.get>[1],
    options?: Parameters<typeof mswHttp.get>[2]
  ): HttpHandler & { preset: PresetFunction } => {
    const handler = mswHttp.get(path, resolver, options);

    const preset: PresetFunction = (apiTitle, ...mockCase) => {
      const setApi = useMockApiStore.getState().setApi;
      //const setApiOnOff = useMockApiOnOffStore.getState().setApiOnOff;

      const newApiInfo: ApiInfo = {
        apiKey: `GET_${path}`,
        method: "GET",
        path: path,
        apiTitle,
        mockCase,
      };

      setApi(newApiInfo);
      //setApiOnOff(newApiInfo.apiKey, false);

      return handler;
    };

    return Object.assign(handler, { preset });
  },
  post: (
    path: string,
    resolver: Parameters<typeof mswHttp.post>[1],
    options?: Parameters<typeof mswHttp.post>[2]
  ): HttpHandler & { preset: PresetFunction } => {
    const handler = mswHttp.post(path, resolver, options);
    const preset: PresetFunction = (apiTitle, ...mockCase) => {
      const setApi = useMockApiStore.getState().setApi;
      //const setApiOnOff = useMockApiOnOffStore.getState().setApiOnOff;

      const newApiInfo: ApiInfo = {
        apiKey: `POST_${path}`,
        method: "POST",
        path: path,
        apiTitle,
        mockCase,
      };

      setApi(newApiInfo);
      //setApiOnOff(newApiInfo.apiKey, false);

      return handler;
    };

    return Object.assign(handler, { preset });
  },
  put: (
    path: string,
    resolver: Parameters<typeof mswHttp.put>[1],
    options?: Parameters<typeof mswHttp.put>[2]
  ): HttpHandler & { preset: PresetFunction } => {
    const handler = mswHttp.put(path, resolver, options);
    const preset: PresetFunction = (apiTitle, ...mockCase) => {
      const setApi = useMockApiStore.getState().setApi;
      //const setApiOnOff = useMockApiOnOffStore.getState().setApiOnOff;

      const newApiInfo: ApiInfo = {
        apiKey: `PUT_${path}`,
        method: "PUT",
        path: path,
        apiTitle,
        mockCase,
      };

      setApi(newApiInfo);
      //setApiOnOff(newApiInfo.apiKey, false);

      return handler;
    };

    return Object.assign(handler, { preset });
  },
  patch: (
    path: string,
    resolver: Parameters<typeof mswHttp.patch>[1],
    options?: Parameters<typeof mswHttp.patch>[2]
  ): HttpHandler & { preset: PresetFunction } => {
    const handler = mswHttp.patch(path, resolver, options);
    const preset: PresetFunction = (apiTitle, ...mockCase) => {
      const setApi = useMockApiStore.getState().setApi;
      //const setApiOnOff = useMockApiOnOffStore.getState().setApiOnOff;

      const newApiInfo: ApiInfo = {
        apiKey: `PATCH_${path}`,
        method: "PATCH",
        path: path,
        apiTitle,
        mockCase,
      };

      setApi(newApiInfo);
      //setApiOnOff(newApiInfo.apiKey, false);

      return handler;
    };

    return Object.assign(handler, { preset });
  },
  delete: (
    path: string,
    resolver: Parameters<typeof mswHttp.delete>[1],
    options?: Parameters<typeof mswHttp.delete>[2]
  ): HttpHandler & { preset: PresetFunction } => {
    const handler = mswHttp.delete(path, resolver, options);
    const preset: PresetFunction = (apiTitle, ...mockCase) => {
      const setApi = useMockApiStore.getState().setApi;
      //const setApiOnOff = useMockApiOnOffStore.getState().setApiOnOff;

      const newApiInfo: ApiInfo = {
        apiKey: `DELETE_${path}`,
        method: "DELETE",
        path: path,
        apiTitle,
        mockCase,
      };

      setApi(newApiInfo);
      //setApiOnOff(newApiInfo.apiKey, false);

      return handler;
    };

    return Object.assign(handler, { preset });
  },
  options: mswHttp.options,
};
