import React from "react";

function RadioButton({ label, value, index,filterChange }) {
    return (
        <>
            <input
                type="radio"
                name="filterrb"
                id={`filter-value-rb-${index}`}
                onChange={(event)=>filterChange(event)}
                value={value}
            />

            <label htmlFor={`filter-value-rb-${index}`} >
                {label}
            </label>

        </>

    )
}

export default RadioButton;