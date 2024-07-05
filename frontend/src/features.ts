import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { MessageTypes } from "./types/apiTypes";
import { SerializedError } from "@reduxjs/toolkit";
import { NavigateFunction } from "react-router";
import toast from "react-hot-toast";
import moment from "moment";

type ResponseType = {
    data: MessageTypes;
} | {
    error: FetchBaseQueryError | SerializedError;
}

export const handleResponse = async (response: ResponseType, navigate: NavigateFunction, url: string) => {

    if ("data" in response) {
        toast.success(response.data.message);
        navigate(url);
    } else {
        const error = response.error as FetchBaseQueryError;
        const message = error.data as MessageTypes;
        toast.error(message.message);
    }
};

export const getLastMonths = () => {
    const currentDate = moment();
  
    currentDate.date(1);
  
    const last6Months: string[] = [];
    const last12Months: string[] = [];
  
    for (let i = 0; i < 6; i++) {
      const monthDate = currentDate.clone().subtract(i, "months");
      const monthName = monthDate.format("MMMM");
      last6Months.unshift(monthName);
    }
  
    for (let i = 0; i < 12; i++) {
      const monthDate = currentDate.clone().subtract(i, "months");
      const monthName = monthDate.format("MMMM");
      last12Months.unshift(monthName);
    }
  
    return {
      last12Months,
      last6Months,
    };
  };