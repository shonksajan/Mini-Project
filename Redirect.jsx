// RedirectingPage.js
import React, { useEffect } from 'react';

function Redirect() {
  useEffect(() => {
    // Automatically close this page after 5 seconds
    const closeTimeout = setTimeout(() => {
      window.close();
    }, 5000); // 5 seconds in milliseconds

    // Clear the timeout when the component unmounts
    return () => clearTimeout(closeTimeout);
  }, []);

  return (
    <div>
      <h2>Redirecting to Bank Server</h2>
      <h4>Please do not refresh this page.</h4>
    </div>
  );
}

export default Redirect;
