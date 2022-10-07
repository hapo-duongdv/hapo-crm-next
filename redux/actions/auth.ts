import * as t from "../constants/index";
import { statusCode } from "../../constants";
import { baseAxios } from "../../BaseAxios/axiosBase";
import { REQUEST_METHOD } from "../../constants";

export const userSignUp = (email: string, password: string) => async (dispatch: any) => {
    try {
      dispatch({
        type: t.LOADING,
        payload: true,
        loadingSignup: true,
      });
      const apiResponse: any = await baseAxios.publicRequest({
        url: process.env.NEXT_PUBLIC_API_ADDRESS + `/register`,
        data: {email, password},
        method: REQUEST_METHOD.POST,
        showNotificationSuccess: false,
      });
      if (
        apiResponse?.data ||
        [statusCode.OK, statusCode.CREATED].includes(apiResponse?.status)
      ) {
        dispatch({
          type: t.REGISTER,
          payload: apiResponse?.data,
        });
      } else if (
        apiResponse?.error ||
        ![statusCode.OK, statusCode.CREATED].includes(apiResponse?.status)
      ) {
        dispatch({
          type: t.LOADING,
          payload: false,
        });
        dispatch({
          type: t.ERROR,
          payload: apiResponse.message,
        });
      }
    } catch (error: any) {
      dispatch({
        type: t.LOADING,
        payload: false,
      });
      dispatch({
        type: t.ERROR,
        payload: error,
      });
    }
  };

export const clearData = (key: string) => async (dispatch: any) => {
  dispatch({
    type: t.CLEAR_DATA,
    payload: key,
  });
};
