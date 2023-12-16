import React, { useEffect } from 'react';

function CookieTest() {
  useEffect(() => {
    fetch('http://localhost:8805/cookie', {
      method: 'GET',
      credentials: 'include', // Important for cookies
    })
      .then((response) => response.text())
      .then((data) => console.log(data))
      .catch((error) => console.error('Error:', error));
  }, []);

  return (
    <div className="App">
      <h1>React App</h1>
    </div>
  );
}

export default CookieTest;
