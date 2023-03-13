import api from "./api";

export const setItemOfLocalStorage = (name: string, data: string) => {
  if (typeof data === "string") {
    localStorage.setItem(name, data);
  } else {
    localStorage.setItem(name, JSON.stringify(data));
  }
};

export const getItemOfLocalStorage = (name: string): string | null => {
  return localStorage.getItem(name);
};

export const removeItemOfLocalStorage = (name: string) => {
  localStorage.removeItem(name);
};

export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common["x-auth-token"] = token;
    localStorage.setItem("token", token);
  } else {
    delete api.defaults.headers.common["x-auth-token"];
    localStorage.removeItem("token");
  }
};

export const stringToEllipsis = (str: string, length: number): string => {
  if (str.length <= length) {
    return str;
  }
  return `${str.slice(0, length)}...`;
};
