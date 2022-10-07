import axios from 'axios';
import statusCode from '../../constants/statusCode';
import { successToast, errorToast } from './toast';
import { CONFIG_AXIOS } from '../../constants/axiosBase';

class BaseAxios {
  constructor() {
    const instance = axios.create(CONFIG_AXIOS);
    instance.interceptors.request.use(function (config) {
      const token = localStorage.getItem('access_token');
      if (token) {
        config.headers = {
          ...config.headers,
          'Authorization': `Bearer ${token}`,
        }
      }
      return config;
    });
    /**
     * interceptors response
     */
    instance.interceptors.response.use(this.handleSuccess, this.handleError);
    this.instance = instance;
  }

  handleSuccess(response) {
    return response;
  }

  handleError(error) {
    if (error.response) {
      const { message } = error.response.data;
      if (error.response.status === statusCode.UN_AUTHORIZED) {
        localStorage.clear();
        if (!window.location.pathname.includes('/login')) window.location.href = `/login?continue=${window.location.pathname}`;
      } else if (error.response?.data?.errors) {
        // do anything
      } else errorToast(message || "Error!")
    }
    return Promise.reject(error);
  }

  async publicRequest(payload) {
    return this.request(payload);
  }

  /**
   * @method
   * @description
   * @param {*} payload this is object contain url, method, params, data
   * @param {url} this is url api
   * @param {method} this is method https request
   * @param {params} this params in request
   * @param {data} this data in body
   * @param {showNotification} check show notification
   * @param {showNotificationSuccess} check show notification success
   */
  async request(payload) {
    const { showNotification, showNotificationSuccess, ...rest } = this.defaultParamters(payload);
    const token = localStorage.getItem('access_token');
    /**
     * @param {headers} this contain Accept, Authorization
     */
    const newParams = {
      ...rest,
      'Authorization': `Bearer ${token}`,
    };

    try {
      const response = await this.instance(newParams);
      const data = response?.data;
      if (response?.status === statusCode.UN_AUTHORIZED) {
        localStorage.clear();
        if (!window.location.pathname.includes('/login')) window.location.href = `/login?continue=${window.location.pathname}`;
      } else if (data?.data || [statusCode.OK, statusCode.CREATED].includes(data?.status)) {
        if (data?.message && showNotificationSuccess) successToast(data?.message);
      } else if ((data?.error || ![statusCode.OK, statusCode.CREATED].includes(data?.status)) && showNotification) {
        errorToast(data?.message || 'Error!');
        if (data?.status === statusCode.UN_AUTHORIZED) {
          localStorage.clear();
          if (!window.location.pathname.includes('/login')) window.location.href = `/login?continue=${window.location.pathname}`;
        }
      }
      return data;
    } catch (error) {
      throw error;
    }
  }

  defaultParamters(payload) {
    const { showNotification = true, ...args } = payload;

    return {
      showNotification,
      ...args,
    };
  }
}

export const baseAxios = new BaseAxios();
