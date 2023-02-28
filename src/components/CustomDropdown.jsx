import React from "react";

function CustomDropdown({id,name,value,type,handler}){
    return(
        <select
            id={id}
            name={name}
            className="form-select"
            value={value}
            onChange={(event) => handler(event)}
            style={{width:'30%'}}
          >
            <option value="-1">Please select</option>
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