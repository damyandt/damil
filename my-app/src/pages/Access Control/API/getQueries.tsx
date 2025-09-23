import { Query } from "../../../API/callApi";

export const getClientsTable = (filter?: string): Query => {
  let endpoint = "users/members";

  filter && (endpoint += `?${filter}`);

  return {
    endpoint,
    method: "GET",
  };
};

export const getMember = (
  searchQuery: string | number,
  searchType: any = "id"
): Query => {
  let endpoint = "users/members/search?";

  switch (searchType) {
    case "id":
      endpoint += `id=${searchQuery}`;
      break;
    case "name":
      const [firstName, ...rest] = String(searchQuery).trim().split(" ");
      const lastName = rest.join(" "); // join remaining parts for last name
      endpoint += `firstName=${encodeURIComponent(firstName)}`;
      if (lastName) {
        endpoint += `&lastName=${encodeURIComponent(lastName)}`;
      }
      break;
    case "email":
      endpoint += `email=${encodeURIComponent(searchQuery)}`;
      break;
    case "phone":
      endpoint += `phone=${encodeURIComponent(searchQuery)}`;
      break;
    case "qrToken":
      endpoint += `qrToken=${encodeURIComponent(searchQuery)}`;
      break;
  }

  return {
    endpoint,
    method: "GET",
  };
};

export const checkInMember = (searchQuery: string | number): Query => ({
  endpoint: `users/members/${searchQuery}/check-in`,
  method: "POST",
});

export const postMember = (formData: any): Query => ({
  endpoint: `users/members`,
  method: "POST",
  variables: formData,
});

export const postSubscription = (formData: any, id: any): Query => ({
  endpoint: `users/membership/${id}`,
  method: "PUT",
  variables: formData,
});

export const getQueryOptions = (url: string): Query => ({
  endpoint: `${url}`,
  method: "GET",
});

export const getPeriodVisitors = (
  id: string | number,
  startDate: string,
  endDate: string
): Query => ({
  endpoint: `members/period/${id}/${startDate}/${endDate}`,
  method: "GET",
});

export const getClientVisits = (id: string): Query => ({
  endpoint: `members/${id}/visits`,
  method: "GET",
});

export const getQRCode = (id: any): Query => ({
  endpoint: `qr/${id}`,
  method: "GET",
});
