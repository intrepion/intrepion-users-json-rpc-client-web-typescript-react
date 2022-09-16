// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './App.css';

// The REST API endpoint
const SERVER_URL = process.env.REACT_APP_SERVER_URL ?? 'http://localhost:3000';

interface GreetingJsonRpcResult {
  id: string;
  jsonrpc: string;
  result: GreetingResult;
}

interface GreetingResult {
  greeting: string;
}

const App = () => {
  // At the beginning, posts is an empty array
  const [greeting, setGreeting] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Define the function that fetches the data from API
  const fetchData = async () => {
    axios.post<GreetingJsonRpcResult>(SERVER_URL)
      .then(response => {
        setGreeting(response.data.result.greeting);
        setLoading(false);
      })
      .catch(exception => {
        console.log(exception);
        const error = false //exception.response.status === 404
          ? 'Resource not found'
          : 'An unexpected error has occurred';
        setError(error);
        setLoading(false);
      });
  };

  // Trigger the fetchData after the initial render by using the useEffect hook
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="wrapper">
      {!loading ? (
        <div className="content">
          {greeting}
        </div>
      ) : (
        <p className="loading">Loading... </p>
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default App;
