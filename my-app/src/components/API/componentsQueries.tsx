import { Query } from "../../API/callApi";

export const deleteQueryAction = (url: string): Query => ({
  endpoint: url,
  method: "DELETE",
});
