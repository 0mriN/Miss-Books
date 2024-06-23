import { BookPreview } from "./BookPreview.jsx";

export function BookList({ books }) {

    return (
        <ul className="book-list">
            {books.map(book =>
                <li key={book.id}>{book.title}
                <BookPreview/>
                <section>
                    <button>Remove</button>
                    <button>Select</button>
                </section>
                </li>
            )}

        </ul>
    )
}