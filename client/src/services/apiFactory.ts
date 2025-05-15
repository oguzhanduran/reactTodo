import axios from "axios"
import { ApiCallerParams } from "@/types/http";

// API caller is a centralized HTTP client written to manage API requests from a single place
export const apiCaller = async ({
  method,
  url,
  data,
  params,
}: ApiCallerParams) => {
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_ENDPOINT;
  const { data: responseData } = await axios({
    method,
    url: `${baseURL}${url}`,
    data,
    params,
  });
  return responseData;
};

// Target of changes.
// apiCaller and createFetchers allow each API call to be reusable and modular.
// So, instead of writing the same code for each endpoint, you can use the same logic for different APIs and endpoints by establishing a general structure.
