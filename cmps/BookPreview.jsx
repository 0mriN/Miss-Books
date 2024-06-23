
export function BookPreview({ book }) {
    
    return (
        <section className="book-preview">
            <h2><u>Title:</u> {book.title}</h2>
            <img src={book.thumbnail} alt="" />
            <h3><u>Price:</u> {book.listPrice.amount}</h3>
        </section>
    )
}