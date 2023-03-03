import React from "react";

function BookShelfItem({item}){
    return(
        <tr>
            <td><image src={item.imageUrl}/></td>
            <td>{item.title}</td>
            <td>{item.description}</td>
            <td></td>
        </tr>
    )

}

export default BookShelfItem;