import { BookList } from "../cmps/BookList.jsx";
import { bookService } from "../services/book.service.js";

const { useEffect, useState } = React

export function BookIndex() {

    const [books, setBooks] = useState(null)

    useEffect(() => {
        bookService.query()
            .then(books => setBooks(books))
            .catch(err => {
                console.log('err:', err);
            })
    }, [])

    if(!books) return <div>Loading...</div>
    return (
        <section className="book-indx">
            <BookList books={books}/>
            {/* <p></p> */}
        </section>
    )
}