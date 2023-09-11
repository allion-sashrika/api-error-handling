import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_ENDPOINT = 'https://jsonplaceholder.typicode.com/posts';

function FallbackUI() {
  const [searchResults, setSearchResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    axios.get(API_ENDPOINT)
      .then(response => {
        if (response.status === 200) {
          setSearchResults(response.data);
        } else {
          setErrorMessage("We're sorry, we couldn't find any results for your search.");
        }
      })
      .catch(error => {
        console.error(error);
        setErrorMessage("An unexpected error occurred. Please try again later or contact support.");
      });
  }, []);

  useEffect(() => {
    setErrorMessage("Simulated error: Unable to connect to the API.");
  }, []);

  return (
    <div>
      {errorMessage ? (
        <div>
          <p>{errorMessage}</p>
          <button onClick={() => window.location.reload()}>Try Again</button>
        </div>
      ) : (
        <ul>
          {searchResults.map(result => (
            <li key={result.id}>{result.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FallbackUI;
