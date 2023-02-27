import React from "react";

function Search({ searchValue, handleSearch, btnSearch }) {
    return (
        
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <input
                        type="text"
                        className="form-control"
                        value={searchValue} placeholder="Search via title/ISBN"
                        onChange={(event) => handleSearch(event)}
                    />
                </div>
                <button type="button" className="btn btn-primary" onClick={btnSearch}>Search</button>
            </div>
    
    )

}

export default Search;