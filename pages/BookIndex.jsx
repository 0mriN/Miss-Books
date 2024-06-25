const { Link } = ReactRouterDOM
import { BookFilter } from "../cmps/BookFilter.jsx";
import { BookList } from "../cmps/BookList.jsx";
import { bookService } from "../services/book.service.js";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";
import { BookDetails } from "./BookDetails.jsx";

const { useEffect, useState } = React

export function BookIndex() {

    const [books, setBooks] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getEmptyBook())

    useEffect(() => {
        loadBooks()
    }, [filterBy])

    function loadBooks() {
        bookService.query(filterBy)
            .then(books => {
                setBooks(books)
            })
            .catch(err => {
                console.log('err:', err)
            })
    }

    function onRemoveBook(bookId) {
        bookService.remove(bookId)
            .then(() => {
                setBooks(prevBooks =>
                    books.filter(book => book.id !== bookId)
                )
                showSuccessMsg(`Book ${bookId} removed succesfuly`)
            })
            .catch(err => {
                console.log('Problem removing book:', err)
                showErrorMsg(`oops! looks like something went wrong in removing this book ${bookId}`)
            })
    }
    function onSetFilter(filterBy) {
        setFilterBy({ ...filterBy })
    }


    if (!books) return <div>Loading...</div>

    return (
        <section className="book-indx">
            <BookFilter filterBy={filterBy} onSetFilter={onSetFilter} />
            <h1>Our Books</h1>
            <button><Link to="/books/edit">Add</Link></button>
            <BookList
                books={books}
                onRemoveBook={onRemoveBook}
            />
        </section>
    )
}