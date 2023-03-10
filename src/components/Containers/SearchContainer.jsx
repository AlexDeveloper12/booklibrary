import React from 'react';

function SearchContainer({ children }) {
  return (
        <div className="form-group">
            <div className="input-group">
                {children}
            </div>
        </div>
  );
}

export default SearchContainer;
