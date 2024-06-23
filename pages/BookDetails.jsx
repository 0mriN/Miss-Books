import { bookService } from "../services/book.service.js"
import { utilService } from "../services/util.service.js"

const { useEffect, useState } = React

export function BookDetails({ bookId, onBack }) {

    const [book, setBook] = useState(null)

    useEffect(() => {
        bookService.get(bookId)
            .then(book => setBook(book))
    }, [])

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
            <p>{book.description}</p>
            <button onClick={onBack}>Return</button>
        </section>
    )
}