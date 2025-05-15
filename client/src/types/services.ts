

import { Todo } from "./categoryTypes";

export namespace TodoService {
    export type FetchParams = { storageKey: string };
    export type FetchResponse = Todo[]; // return data
  
    export type SetPayload = { todos: Todo[]; storageKey: string };
    export type SetResponse = boolean; // successful or unsuccessful
  
    export type UpdatePayload = { todos: Todo[]; storageKey: string };
    export type UpdateResponse = boolean;
  }

  export type Services = {
    todos: {
      fetch: {
        queryParams: TodoService.FetchParams;
        response: TodoService.FetchResponse;
      };
      set: {
        payload: TodoService.SetPayload;
        response: TodoService.SetResponse;
      };
      update: {
        payload: TodoService.UpdatePayload;
        response: TodoService.UpdateResponse;
      };
    };
  };

// We use queryParams on the get requests but we use payload on the post, patch and put requests.