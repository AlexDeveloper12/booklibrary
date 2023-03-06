import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {customAuthors,customGenres, formatDate,customBookShelfAuthor,customBookShelfGenre}  from "../components/Utils/Utils";
import "../styles/BookShelfItem.css";

function BookShelfItem({item, openDeleteModal}){
    
    return(
        <tr>
            <td scope="row" className="centerText centerImage " ><img src={item.imageUrl} width={250} height={250} /></td>
            <td scope="row">{item.title}</td>
            <td scope="row">{item.description}</td>
            <td scope="row">{customBookShelfAuthor(item.authors)} </td>
            <td scope="row">{customBookShelfGenre(item.genres)}</td>
            <td scope="row">{item.publisher}</td>
            <td scope="row"> {formatDate(item.publishedDate)}</td>
            <td scope="row" className="centerText"><FontAwesomeIcon icon={faTrash} className="text-center" onClick={()=>openDeleteModal(item.id)} /></td>
        </tr>
    )

}

export default BookShelfItem;