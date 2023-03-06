import moment from "moment";

export const printTypes = ['all', 'books', 'magazines'];
export const bookTypes = ['partial', 'full', 'free-ebooks', 'paid-ebooks', 'ebooks'];
export const filterButtonValues = [{
    label: "ISBN",
    value: "ISBN"
},
{
    label: "Title",
    value: "Title"
}]

export const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '85%',
        height: '70%'
    },
};

export const customDeleteStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '55%',
        height: '40%'
    },
}

export const customAuthors = (volumeInfo) => {

    var authorString = "";

    if (volumeInfo !== null && volumeInfo !== undefined) {

        if (volumeInfo.authors !== null && volumeInfo.authors !== undefined) {
            console.log(volumeInfo.authors)

            volumeInfo.authors.map((value, index) => {
                authorString += `${value}`
                if (index > 0) {
                    authorString += authorString + ","
                }
            })
        }
    }

    return authorString;


}

export const customGenres = (volumeInfo) => {
    var genreString = "";

    if (volumeInfo !== null && volumeInfo !== undefined) {
        if (volumeInfo.categories !== null && volumeInfo.categories !== undefined) {
            volumeInfo.categories.map((value, index) => {
                genreString += `${value}`
                if (index > 0) {
                    genreString += genreString + ","
                }
            })
        }
    }

    return genreString;
}


export const formatDate = (dateTime) => {
    var formattedDate = moment(dateTime).format("DD/MM/YYYY");

    return formattedDate;
}

export const customBookShelfAuthor = (data) => {
    var bookShelfAuthorString = "";

    if (Array.isArray(data)) {
        data.map((value, index) => {

            if (index > 0) {
                bookShelfAuthorString + ", " + bookShelfAuthorString
            } else {
                bookShelfAuthorString += value
            }
        })
    } else {
        bookShelfAuthorString = data === "" ? "No authors" : data;
    }
    return bookShelfAuthorString;
}

export const customBookShelfGenre = (data) => {
    var bookShelfGenreString = "";

    if (Array.isArray(data)) {
        data.map((value, index) => {
            if (index > 0) {
                bookShelfGenreString + ", " + bookShelfGenreString;
            }
            else {
                bookShelfGenreString += value
            }
        })
    } else {
        bookShelfGenreString = data === "" ? "No genres" : data;
    }

    return bookShelfGenreString;
}