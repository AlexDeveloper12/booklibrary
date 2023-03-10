import React from 'react';

function RadioGroupContainer({ children }) {
  return (
    <div className="container">
        <div className="row form-group mb-4">
                {children}
        </div>
    </div>
  );
}

export default RadioGroupContainer;
