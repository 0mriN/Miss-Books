
export function BookPreview() {
    var book = { title: 'Puki Reactof', price: 87 }
    return (
        <section className="book-preview">
            <h2>{book.title}</h2>
            <h3>Price: {book.price}</h3>
        </section>
    )
}