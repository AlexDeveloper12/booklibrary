import React from "react";

function RadioButton({ label, value, index, filterChange }) {
    return (
        <div>
            <input
                type="radio"
                name="filterrb"
                id={`filter-value-rb-${index}`}
                onChange={(event)=>filterChange(event)}
                value={value}
                className="form-check-input"
            />
            <label className="form-check-label" htmlFor={`filter-value-rb-${index}`} >
                {label}
            </label>
        </div>
        
    )
}

export default RadioButton;