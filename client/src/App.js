import React, { useState, useEffect } from 'react';
import SubscribersList from './SubscribersList';
import Component from './Component';
import ErrorComponent from './ErrorComponent';
import FallbackUI from './FallbackUI';
import MyComponent from './MyComponent';

function ErrorBoundary({ children }) {
    const [hasError, setHasError] = useState(false);
  
    useEffect(() => {
      const errorHandler = (error, errorInfo) => {
        console.error(error, errorInfo);
        setHasError(true);
      };
  
      window.addEventListener("error", errorHandler);
  
      return () => {
        window.removeEventListener("error", errorHandler);
      };
    }, []);
  
    return hasError ? <div>Something went wrong. Please try again later.</div> : children;
}

function App() {
    return (
        <div className="App">
            <h1>My React Express App</h1>            
            <ErrorBoundary>
                <SubscribersList />
                {/* <Component /> */}
                <ErrorComponent />
                <FallbackUI />   
                <MyComponent />    
            </ErrorBoundary>            
        </div>
    );
}

export default App;
