import React, { useState } from 'react';
import {useAuth} from "../../auth/AuthenticationContext";
import endpoints from "../endpoints";
import {useAPI} from "./APIContext";

/**
 * Factory per creare degli hook su fetch di specifiche risorse
 * @param endpoint
 * @param options object|callback se è una callback, viene passato tra un oggetto contenente "user"
 */
export const createUseFetch = (endpoint, options = {}) => {

  const { user } = useAuth();
  const { get } = useAPI();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState([]);

  const fetch = async () => {
    try {
      const response = await get(endpoint, typeof options === "function" ? options(user) : options);
      setData(response.data);
    } catch (exception) {
      setError(exception);
      console.log("[useFetch] Request failed: " + exception.response ? exception.response.data.message : exception);
    } finally {
      setLoading(false);
    }
  }

  const refresh = async () => {
    setRefreshing(true);
    fetch().finally(() => setRefreshing(false));
  };

  return { fetch, data, loading, error, refreshing, refresh };
};
