const { useParams, Link } = ReactRouterDOM

// import { AddReview } from "../cmps/AddReview.jsx"
import { LongTxt } from "../cmps/LongTxt.jsx"
import { bookService } from "../services/book.service.js"
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faHandPointRight } from '@fortawesome/free-solid-svg-icons'
// import { utilService } from "../services/util.service.js"

const { useEffect, useState } = React

export function BookDetails() {

    const [book, setBook] = useState(null)
    const [nextBookId, setNextBookId] = useState()
    const [prevBookId, setPrevBookId] = useState()

    const { bookId } = useParams()

    useEffect(() => {
        bookService.get(bookId)
            .then(book => {
                setBook(book)

                bookService.getNextBookId(bookId)
                    .then(nextId => setNextBookId(nextId))

                    bookService.getPrevBookId(bookId)
                    .then(prevId => setPrevBookId(prevId))
            })


    }, [bookId])

    const price = book && book.listPrice && (
        (book.listPrice.amount > 150) ? 'red' :
            (book.listPrice.amount < 20) ? 'green' : ''
    )


    if (!book) return <div>Loading...</div>

    return (
        <section className="book-details">
            <h2>Book Title:{book.title}</h2>
            <h1>Book Subtitle:{book.subtitle}</h1>
            <h2>Book Author:{book.authors}</h2>
            <img src={book.thumbnail} alt="" />
            {book.listPrice.isOnSale && <img className="on-sale" src="assets/img/onSale.png" alt="" />}
            <h3 className={price}>Book Price:{book.listPrice.amount}</h3>
            <h4>Book Type:{book.categories}</h4>
            <h5>Book Published in:{book.publishedDate}</h5>
            {(2024 - book.publishedDate) < 1 && <p>New</p>}
            {(2024 - book.publishedDate) > 10 && <p>Vintage</p>}
            {book.pageCount > 500 && <p>Serious Reading</p>}
            {book.pageCount > 200 && book.pageCount < 500 && <p>Decent Reading</p>}
            {book.pageCount > 100 && book.pageCount < 200 && <p>Light Reading</p>}
            <LongTxt txt={book.description} />
            <button><Link to="/books">Return</Link></button>
            {/* <FontAwesomeIcon icon={faHandPointRight} /> */}
            <div>
            <button><Link to={`/books/${prevBookId}`}>Previous</Link></button>
            <button><Link to={`/books/${nextBookId}`}>Next</Link></button>
            {/* <AddReview/> */}
            </div>
        </section>
    )
}