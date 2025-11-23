import { Query } from "../../../../API/callApi";
import { NewsItem } from "../../News/API/news";

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

export const deleteNewsItem = (newsId: string): Query => ({
  endpoint: `news/${newsId}`,
  method: "DELETE",
});
export const postJoinOrLeaveClass = (id: string, join: boolean): Query => ({
  endpoint: `trainings/${join ? "join" : "cancel"}/${id}`,
  method: "POST",
});
