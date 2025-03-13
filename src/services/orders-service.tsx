import axios, { AxiosResponse } from "axios";
import { handleError } from "./handle-api-error";
import { Order } from "../model/orders";

export const fetchOrdersList = async (): Promise<AxiosResponse | null> => {
  try {
    const response = await axios.get("/orders.json");

    if (typeof response.data === "string" && response.data.includes("<html")) {
      return {
        ...response,
        status: 404,
        statusText: "Not Found",
        data: null,
      };
    }

    return response;
  } catch (error) {
    return handleError(error);
  }
};

export const ordersById = async (id: string): Promise<Order | null> => {
  try {
    const response = await axios.get("/orders.json");
    const foundOrder = response.data.orders.find(
      (order: Order) => order.id === id,
    );
    return foundOrder || null;
  } catch (error) {
    handleError(error);
    return null;
  }
};
