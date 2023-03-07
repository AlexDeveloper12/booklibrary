import React from "react";
import Rating from "./Rating";
import { Button, Card, CardHeader, CardMedia, CardContent, CardActions, Typography } from "@mui/material";

function Book({ item, toggleModal, addToBookshelf }) {

    const { volumeInfo } = item;

    console.log(item);
    const renderRating = (rating) => {
        if (rating !== undefined && rating !== null) {
            const roundedRating = Math.round(rating);
            let ratingsList = [];

            for (var i = 0; i < roundedRating; i++) {
                ratingsList.push(<Rating />)
            }

            return ratingsList;
        } else {
            return "No rating";
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

                    </Typography>

                </CardContent>
            </Card>
        </div>
    )
}

export default Book;