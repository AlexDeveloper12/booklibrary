import React from "react";
import {Select,MenuItem} from "@mui/material";

function CustomDropdown({id,name,value,type,handler}){
    return(

      <Select 
        id={id}
        name={name}
        style={{width:'30%'}}
        value={value}
        onChange={(event) => handler(event)}
        key={id}
        className="mb-4"
      >
        <MenuItem value="-1">{`Please select ${ name==="printtype" ? "print type" : "book type" }`}</MenuItem>
            {
              type.map((value) => {
                return (
                  <MenuItem value={value}>{value}</MenuItem>
                )
              })
            }
      </Select>
    )
}

export default CustomDropdown;