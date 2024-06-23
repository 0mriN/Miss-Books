
export function BookPreview({ book }) {
    
    const { title, price } = book
    
    return (
        <section className="book-preview">
            <h2><u>Title:</u> {title}</h2>
            <img src={`assets/img/${title}.png`} alt="" />
            <h3><u>Price:</u> {price}</h3>
        </section>
    )
}