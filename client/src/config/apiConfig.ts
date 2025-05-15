import { Method } from "@/types/http";
import { Services } from "@/types/services";
import { apiRoutes } from "@/constants/apiRoutes";

export const apiConfig: {
  [K in keyof Services]: { //Specifies the names of the main services within the Services type -> todos, users etc
    [C in keyof Services[K]]: { // Specifies the operations (fetch, set, update) within each service.
      url: string;
      method: Method;
    };
  };
} = {
  todos: {
    fetch: {
      method: Method.GET,
      url: apiRoutes.todos.base,
    },
    set: {
      method: Method.POST,
      url: apiRoutes.todos.base,
    },
    update: {
      method: Method.PATCH,
      url: apiRoutes.todos.base,
    },
  },
} 

// apiConfig is  a configuration object that centrally defines all API requests.
// it specifies which URL each service will go to with which HTTP method;
