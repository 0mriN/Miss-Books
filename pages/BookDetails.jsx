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
            <h1>Book Title:{book.title}</h1>
            <h1>Book Price:{book.price}</h1>
            <img src={`assets/img/${book.title}.png`} alt="" />
            <p>{utilService.makeLorem(50)}</p>
            <button onClick={onBack}>Return</button>
        </section>
    )
}