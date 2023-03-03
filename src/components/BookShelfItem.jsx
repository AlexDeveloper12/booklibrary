import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {customAuthors,customGenres, formatDate}  from "../components/Utils/Utils";

function BookShelfItem({item, openDeleteModal}){
    return(
        <tr>
            <td scope="row" ><image src={item.imageUrl} width={300} height={200} /></td>
            <td scope="row">{item.title}</td>
            <td scope="row">{item.description}</td>
            <td scope="row">Author</td>
            <td scope="row">Genre</td>
            <td scope="row">{item.publisher}</td>
            <td scope="row"> {formatDate(item.publishedDate)}</td>
            <td><FontAwesomeIcon icon={faTrash} className="text-center" onClick={()=>openDeleteModal(item.id)} /></td>
        </tr>
    )

}

export default BookShelfItem;