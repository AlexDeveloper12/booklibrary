import React from "react";

function CustomDropdown({id,name,value,type,handler}){
    return(
        <select
            id={id}
            name={name}
            className="form-select mb-4"
            value={value}
            onChange={(event) => handler(event)}
            style={{width:'30%'}}
            key={id}
          >
            <option value="-1">{`Please select ${ name==="printtype" ? "print type" : "book type" }`}</option>
            {
              type.map((value) => {
                return (
                  <option value={value}>{value}</option>
                )
              })
            }
          </select>
    )
}

export default CustomDropdown;