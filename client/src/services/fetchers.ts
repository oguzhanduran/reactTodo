import { apiConfig } from "@/config/apiConfig";
import { apiCaller } from "./apiFactory";


const createFetchers = (config = apiConfig) => {
  const fetchers: any = {};

  for (const [serviceName, endpoints] of Object.entries(config)) { //serviceName: todos - endpoints: fetch, set, update
    fetchers[serviceName] = {};
    for (const [endpointName, { url, method }] of Object.entries(endpoints)) { //endpointName: fetch, set, update
      fetchers[serviceName][endpointName] = async ({
        payload,
        queryParams,
      }: any) => {
        return await apiCaller({
          method: method,
          url,
          data: payload,
          params: queryParams,
        });
      };
    }
  }

  return fetchers;
};

export const fetchers = createFetchers();

// Fetchers automatically creates dynamic fetch functions for all services and endpoints configured via apiConfig.
