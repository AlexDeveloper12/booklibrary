import { Button, TextField } from "@mui/material";
import React from "react";

function Search({ searchValue, handleSearch, btnSearch }) {
    return (
        <div className="col-md-12">
            <div className="input-group mb-3">

                    <TextField
                        value={searchValue}
                        onChange={(event) => handleSearch(event)}
                        type="text"
                        placeholder="Search via Title/ISBN"
                        size="medium"
                    />

                {/* <button type="button" className="btn btn-primary" onClick={btnSearch}>Search</button> */}
                <Button variant="contained" colour="primary" onClick={btnSearch} >Search</Button>
            </div>
        </div>

    )

}

export default Search;