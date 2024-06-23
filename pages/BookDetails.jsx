import { bookService } from "../services/book.service.js"
import { utilService } from "../services/util.service.js"

const { useEffect, useState } = React

export function BookDetails({ bookId , onBack}) {

    const [book, setBook] = useState(null)

    useEffect(() => {
        bookService.get(bookId)
            .then(book => setBook(book))
    }, [])

    if(!book)return <div>Loading...</div>

    return (
        <section className="book-details">
            <h2>Book Title:{book.title}</h2>
            <h1>Book Subtitle:{book.subtitle}</h1>
            <h2>Book Author:{book.authors}</h2>
            <img src={book.thumbnail} alt="" />
            <h3>Book Price:{book.listPrice.amount}</h3>
            <h4>Book Type:{book.categories}</h4>
            <h5>Book Published in:{book.publishedDate}</h5>
            <p>{book.description}</p>
            <button onClick={onBack}>Return</button>
        </section>
    )
}