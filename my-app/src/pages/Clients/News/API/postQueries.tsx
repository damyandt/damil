import { Query } from "../../../../API/callApi";
import { NewsItem } from "./news";

export const postNewsItem = (formData: NewsItem): Query => ({
  endpoint: `news`,
  method: "POST",
  variables: formData,
});

export const editNewsItem = (formData: NewsItem): Query => ({
  endpoint: `news/${formData.newsId}`,
  method: "PUT",
  variables: formData,
});

export const deleteNewsItem = (newsId: number): Query => ({
  endpoint: `news/${newsId}`,
  method: "DELETE",
});
