import React from "react";
import {FormControlLabel,Radio} from "@mui/material";

function RadioButton({ label, value, index, filterChange }) {
    return (
        <div>
            <FormControlLabel value={value} control={<Radio name="filterrb" id={`filter-value-rb-${index}`} value={value} onChange={(event)=>filterChange(event)} />} label={label}/>
{/* 
            <input
                type="radio"
                name="filterrb"
                id={`filter-value-rb-${index}`}
                onChange={(event)=>filterChange(event)}
                value={value}
                className="form-check-input"
            />
            <label className="form-check-label" htmlFor={`filter-value-rb-${index}`} style={{marginLeft:'20px'}} >
                {label}
            </label> */}
        </div>
        
    )
}

export default RadioButton;