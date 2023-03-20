import jwtDecode from "jwt-decode";
import api from "./api";

//  Save some value in localStorage
export const setItemOfLocalStorage = (name: string, data: any) => {
  if (typeof data === "string") {
    localStorage.setItem(name, data);
  } else {
    localStorage.setItem(name, JSON.stringify(data));
  }
};

//  Get the value of localStorage
export const getItemOfLocalStorage = (name: string): string | null => {
  return localStorage.getItem(name);
};

//  Remove the value from localStorage
export const removeItemOfLocalStorage = (name: string) => {
  localStorage.removeItem(name);
};

//  Set the authentication token of api request
export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common["x-auth-token"] = token;
    localStorage.setItem("token", token);
  } else {
    delete api.defaults.headers.common["x-auth-token"];
    localStorage.removeItem("token");
  }
};

//  Ellipse a too long string
export const stringToEllipsis = (str: string, length: number): string => {
  if (str.length <= length) {
    return str;
  }
  return `${str.slice(0, length)}...`;
};

//  Capitalize first letter
export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

//  Decode token
export const decodeToken = (token: string): any => {
  return jwtDecode(token);
};

//  Get visible date time
export const getVisibleDateTime = (datetime: Date): string => {
  let date = datetime.toDateString();
  let time = datetime.toTimeString();
  let _time = `${time.split(":")[0]}:${time.split(":")[1]}`;
  let _date = `${date.split(" ")[1]} ${date.split(" ")[2]}, ${
    date.split(" ")[3]
  }`;
  return `${_time} ${_date}`;
};

//  Get datetime on the current timezone
export const convertTimeForClientTimezone = (date: string | Date): Date => {
  const clientTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return new Date(
    (typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {
      timeZone: clientTimezone
    })
  );
};
