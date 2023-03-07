import React from "react";
// import Rating from "./Rating";
import { Button, Card, CardHeader, CardMedia, CardContent, CardActions, Typography, Rating } from "@mui/material";

function Book({ item, toggleModal, addToBookshelf }) {

    const { volumeInfo } = item;

    const renderRating = (rating) => {
        console.log(rating);
        if (rating !== undefined && rating !== null) {
            return <Rating value={rating} disabled />
        } else {
            return <span>No rating</span>
        }
    }

    return (
        <div className="col-md-3 mb-4" style={{ height: '600px', overflow: 'hidden', textOverflow: 'ellipsis', marginLeft: '10px', width: '350px' }}>

            <Card sx={{ maxWidth: 345 }}>
                <CardHeader
                    title={volumeInfo.title}
                />
                <CardMedia
                    component="img"
                    height="400"
                    image={`${volumeInfo.imageLinks !== undefined ? volumeInfo.imageLinks.thumbnail : null}`}
                    onClick={() => toggleModal(item)}
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        <div className="row">
                            {item.volumeInfo.subtitle !== undefined ? <span> {volumeInfo.subtitle} </span> : <span>No subtitle</span>}
                        </div>
                        <div className="row">
                            {
                                volumeInfo.pageCount !== undefined ? <span> Page count: {volumeInfo.pageCount}</span> : <span>No page count</span>
                            }
                        </div>

                        <div className="row">
                            {renderRating(volumeInfo.averageRating)}
                        </div>

                    </Typography>

                </CardContent>
            </Card>
        </div>
    )
}

export default Book;