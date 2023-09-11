import React, { useState, useEffect } from 'react';
import ErrorComponent from './ErrorComponent';

function Error() {
  const [error, setError] = useState(null);

  const makeApiCall = () => {
    // Simulate an API call that may result in an error
    try {
      // Simulate an error
      throw new Error("API call failed: Error occurred");
    } catch (error) {
      // Handle the error and display it
      setError(error);
    }
  };

  const clearError = () => {
    // Clear the error by setting it to null
    setError(null);
  };

  useEffect(() => {
    // This cleanup function will clear the error when the component unmounts
    return () => {
      clearError();
    };
  }, []);

  return (
    <div>
      <h1>React API Error Handling</h1>
      <button onClick={makeApiCall}>Make API Call</button>
      {error && <ErrorComponent error={error} clearError={clearError} />}
    </div>
  );
}

export default Error;
