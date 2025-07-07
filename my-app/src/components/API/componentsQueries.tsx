import { Query } from "../../API/callApi";

export const deleteQueryAction = (url: string, id: string): Query => ({
  endpoint: `${url}${id}`,
  method: "DELETE",
});
