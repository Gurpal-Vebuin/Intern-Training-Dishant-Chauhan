import { FormData, LoginFormData } from "../types/interfaces/interface";
import { API } from "../services/api/CreateAxios";
import { Links } from "../types/constants/Links/Links";
import StatusCodes from "../types/constants/statuscode/status";
import axios, { AxiosError } from "axios";

const UseAuth = () => {
  const register = async (data: FormData) => {
    try {
      const response = await API.post(`${Links.REGISTER}`, data);
      if (response.status === StatusCodes.CREATED) {
        return { success: true, data: response.data.message };
      } else {
        return { success: false, error: "Unexpected status code" };
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const error: AxiosError<{ message: string }> = err;
        return {
          success: false,
          error: error.response?.data?.message || "Registration failed",
        };
      } else {
        return { success: false, error: "An unexpected error occurred" };
      }
    }
  };

  const login = async (data: LoginFormData) => {
    try {
      const response = await API.post(`${Links.LOGIN}`, data);

      if (response.status === StatusCodes.SUCCESS) {
        return {
          success: true,
          data: response.data.message,
          token: response.data.token,
        };
      } else {
        return { success: false, error: "Unexpected status code" };
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const error: AxiosError<{ message: string }> = err;
        console.log(error);
        return {
          success: false,
          error: error.response?.data?.message || "Something went wrong!",
        };
      } else {
        return { success: false, error: "An unexpected error occurred" };
      }
    }
  };

  return { register, login };
};

export default UseAuth;
