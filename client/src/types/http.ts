import { TodoService } from "./services";

export enum Method {
  GET = "GET",
  POST = "POST",
  PATCH = "PATCH",
}

export type ApiCallerParams = {
  method: Method;
  url: string;
  data?: TodoService.SetPayload | TodoService.UpdatePayload;
  params?: Record<string, string | number | boolean>; 
}

// Record: Used in TypeScript to define keys of a particular type and the values ​​associated with those keys. Key is string value can string, number or value