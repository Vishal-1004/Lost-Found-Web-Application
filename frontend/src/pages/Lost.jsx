// import React from 'react';
import WarningComponent from '../utility/WarningComponent' // adjust the import path accordingly

const Lost = () => {
  const data = null; // replace this with your actual data fetching logic

  return (
    <div>
      {data ? (
        <div>Your actual lost content goes here.</div>
      ) : (
        <WarningComponent />
      )}
    </div>
  );
};

export default Lost;
