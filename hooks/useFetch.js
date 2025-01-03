import { useState, useCallback, useEffect, useRef } from 'react';
import api from '../services/api';

/**
 * useFetch: A custom React hook for making HTTP requests and managing loading/error states.
 *
 * This hook provides a reusable way to make HTTP GET requests using axios and manages
 * the loading, error, and data states. It utilizes the 'api' service for making requests.
 *
 * @param {string} url - The URL to fetch data from. Must be a non-empty string.
 * @param {object} [config] - Optional axios configuration object.
 * @returns {{
 *   data: any,
 *   loading: boolean,
 *   error: string | null,
 *   fetchData: () => Promise<void>
 * }} An object containing the data, loading state, error state, and a fetchData function.
 *
 * @throws {TypeError} If the provided URL is not a string.
 */
const useFetch = (url, config) => {
    if (typeof url !== 'string') {
        const errorMessage = 'Error: URL must be a string';
        console.error(errorMessage, { url });
      throw new TypeError(errorMessage);
    }

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
    const cancelRequest = useRef(null);


  const fetchData = useCallback(async () => {
    setLoading(true);
      setError(null);
    try {

        const source = api.CancelToken.source();
        cancelRequest.current = source.cancel;
        const response = await api.get(url, {...config, cancelToken: source.token });
        setData(response);
    } catch (axiosError) {

        if (api.isCancel(axiosError)) {
            console.log('Request cancelled', { url });
            return;
        }
          let errorMessage = 'An unexpected error occurred';
        if (axiosError && axiosError.message) {
            errorMessage = axiosError.message;
        } else if (axiosError && axiosError.response && axiosError.response.data && axiosError.response.data.message) {
            errorMessage = axiosError.response.data.message;
        }


          console.error('Error fetching data:', {
              url,
              errorMessage,
              axiosError,
          });
      setError(errorMessage);

    } finally {
        setLoading(false);
    }
  }, [url, config]);



    useEffect(() => {
        return () => {
            if(cancelRequest.current){
              cancelRequest.current('Request cancelled on unmount');
            }
        };
    }, []);



  return { data, loading, error, fetch: fetchData };
};

export { useFetch };