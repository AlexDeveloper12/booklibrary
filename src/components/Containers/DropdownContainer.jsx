import React from 'react';

function DropdownContainer({ children }) {
    return (
        <div className="form-group row">
            <div className="input-group">
                {children}
            </div>
        </div>
    )

}
export default DropdownContainer;
