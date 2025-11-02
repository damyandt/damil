import {
  handleFetchUserAccessToken,
  handleUserSignOut,
} from "../context/authContextUtils";
import { getCookie } from "../Global/Utils/commonFunctions";
import { User } from "../pages/usersPages/api/userTypes";
export const COOKIE_ACCESS_TOKEN = "accessToken";
export const COOKIE_REFRESH_TOKEN = "refreshToken";
const NO_AUTH_ENDPOINTS = ["/tenants/lookup", "/access-requests"];

const shouldSkipToken = (endpoint: string) =>
  NO_AUTH_ENDPOINTS.some((path) => endpoint.includes(path)) ||
  endpoint.startsWith("/auth/") ||
  endpoint.startsWith("/api/v1/auth/");
export type ResponseError = {
  detail: string;
};
export type Query = {
  endpoint: string;
  method: "GET" | "POST" | "DELETE" | "PUT" | "PATCH";
  variables?: { [key: string]: any };
  endpointBase?: string;
  receiveErrorMessage?: boolean;
  multipartForm?: boolean;
  returnJson?: boolean;
  multipartCustomKey?: string;
  responseType?: "json" | "blob";
  dontAppendEndpointBase?: boolean;
  triggerDownload?: boolean;
};
export type CallApiParams = {
  query: Query;
  auth: {
    setAuthedUser: React.Dispatch<React.SetStateAction<Partial<User>>>;
  } | null;
};

/**
 * "query" contains the information needed to make the back-end request.
 * "auth" can be optionally provided. If it's provided, it means that the
 * back-end request is auth protected and requires valid user access token.
 * "requestIsReMade" flag passed as true means that the request has already
 * been made once and this is the second call to it.
 */
const callApi = async <T>(
  params: CallApiParams,
  requestIsReMade: boolean = false
): Promise<T> => {
  const { query, auth } = params;
  const {
    endpoint,
    method,
    variables,
    receiveErrorMessage,
    multipartForm,
    returnJson = true,
    triggerDownload,
  } = query;
  const endpointToUse = "https://fitmanage-b0bb9372ef38.herokuapp.com/api/v1/";
  let response: Response;
  const accessToken = getCookie(COOKIE_ACCESS_TOKEN);

  if (method === "GET" || method === "DELETE") {
    let input: string = "";

    if (variables) {
      const params = new URLSearchParams(variables).toString();
      input = `?${params}`;
    }
    const url = `${endpointToUse}${endpoint}${input}`;
    response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(!shouldSkipToken(endpoint) && accessToken
          ? { Authorization: `Bearer ${accessToken}` }
          : {}),
      },
      credentials: "include",
    });

    if (triggerDownload && response.ok) {
      const disposition = response.headers.get("content-disposition");
      if (disposition && disposition.includes("attachment")) {
        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const a = document.createElement("a");

        const filenameMatch = disposition.match(/filename="?(.+?)"?$/);
        const filename = filenameMatch?.[1] || "download";

        a.href = downloadUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(downloadUrl);

        return {} as T; // no JSON return, because it's a file
      }
    }
  } else if (multipartForm) {
    if (multipartForm) {
      const formData = new FormData();

      if (variables) {
        Object.keys(variables).forEach((key) => {
          const value = variables[key];
          if (Array.isArray(value) && value[0] instanceof File) {
            value.forEach((file: File) => formData.append(key, file));
          } else {
            formData.append(key, value);
          }
        });
      }

      response = await fetch(`${endpointToUse}${endpoint}`, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        },
        body: formData,
      });
    } else {
      response = await fetch(`${endpointToUse}${endpoint}`, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        },
        ...(variables && { body: JSON.stringify(variables) }),
      });
    }
  } else {
    let responseBody: any;
    let fileURL: string;
    if (variables) {
      responseBody = JSON.stringify(variables);
    }

    response = await fetch(`${endpointToUse}${endpoint}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      },
      body: responseBody,
    });

    if (triggerDownload && response.ok) {
      const disposition = response.headers.get("content-disposition");
      if (disposition && disposition.includes("attachment")) {
        const blob = await response.blob();
        const contentType = response.headers.get("Content-Type");

        const previewContainer = document.createElement("div");
        previewContainer.style.position = "fixed";
        previewContainer.style.top = "0";
        previewContainer.style.left = "0";
        previewContainer.style.width = "100%";
        previewContainer.style.height = "100%";
        previewContainer.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
        previewContainer.style.zIndex = "9999";
        previewContainer.style.display = "flex";
        previewContainer.style.justifyContent = "center";
        previewContainer.style.alignItems = "center";
        previewContainer.style.flexDirection = "column";
        document.body.appendChild(previewContainer);

        if (contentType?.includes("application/pdf")) {
          fileURL = URL.createObjectURL(blob);
          const iframe = document.createElement("iframe");
          iframe.src = fileURL;
          iframe.width = "80%";
          iframe.height = "80%";
          previewContainer.appendChild(iframe);
        } else if (contentType?.includes("image")) {
          fileURL = URL.createObjectURL(blob);
          const img = document.createElement("img");
          img.src = fileURL;
          img.alt = "Preview";
          document.body.appendChild(img);
        }
        previewContainer.addEventListener("click", (event) => {
          if (event.target === previewContainer) {
            previewContainer.remove();
            window.URL.revokeObjectURL(fileURL);
          }
        });
        return {} as T;
      }
    }
  }
  // if expired accessToken and valid refresh token -> fetch new access token
  // this block of code only runs if the callApi function is not called for
  // a second time and the <auth> param is present.
  if (auth && !requestIsReMade && response.status === 401) {
    const jsonData: { detail: string } = await response.json();
    if (jsonData.detail === "Invalid access token") {
      const refreshToken = getCookie(COOKIE_REFRESH_TOKEN);
      const accessToken = await handleFetchUserAccessToken(refreshToken);
      if (accessToken) {
        // we have fetched and saved the accessToken
        return await callApi({ query, auth }, true);
      } else {
        // accessToken not fetched, log out the user due to invalid
        // or expired refresh token
        handleUserSignOut();
      }
    }
  }

  // if status code is not within 200, there is an error
  if (!response.status.toString().startsWith("2") && !receiveErrorMessage) {
    throw new Error(`API error - ${response.url}`);
  }

  if (query.responseType === "blob") {
    const blobData = await response.blob();
    return blobData as T;
  }

  if (returnJson) {
    const jsonData: T = await response.json();
    return jsonData;
  } else {
    return response as T;
  }
};

export default callApi;
