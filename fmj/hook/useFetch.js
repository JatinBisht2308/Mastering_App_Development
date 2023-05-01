import { useState, useEffect } from "react";
import axios from "axios";
import { RAPID_API_KEY } from '@env';

const rapidApiKey = RAPID_API_KEY;
const useFetch = (endpoint, query) => {
  const [data, setData] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const options = {
    method: "GET",
    url: "https://jsearch.p.rapidapi.com/${endpoint}",
    headers: {
      "content-type": "application/octet-stream",
      "X-RapidAPI-Key": rapidApiKey,
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
    params: { ...query },
  };
  const fetchData = async () => {
    // when we are fetching then the setloading is true
    setIsLoading(true);
    try {
      const response = await axios.request(options);
      setData(response.data.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      alert("There is an error");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const reFetch = () => {
    setIsLoading(true);
    fetchData();
  };
  return { data, isloading, error, reFetch };
};

export default useFetch;