import React from "react";
import {Select} from "@mui/material";

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
        <option value="-1">{`Please select ${ name==="printtype" ? "print type" : "book type" }`}</option>
            {
              type.map((value) => {
                return (
                  <option value={value}>{value}</option>
                )
              })
            }
      </Select>
    )
}

export default CustomDropdown;