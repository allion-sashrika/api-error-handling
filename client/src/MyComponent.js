import React, { useState, useEffect } from 'react';

function MyComponent() {
  const [data, setData] = useState(null);

  // Simulate an error condition
  useEffect(() => {
    if (!data) {
      throw new Error("Simulated error: Data is not available.");
    }
  }, [data]);

  return (
    <div>
      {data}
    </div>
  );
}

export default MyComponent;
