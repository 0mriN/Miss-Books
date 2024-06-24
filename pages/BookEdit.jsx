const { useNavigate, useParams } = ReactRouterDOM
const { useState, useEffect } = React
import { bookService } from "../services/book.service.js"

export function BookEdit() {
    const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook())
    const navigate = useNavigate()
    const { bookId } = useParams()

    useEffect(() => {
        if (bookId) loadBook()
    }, [bookId])

    function loadBook() {
        bookService.get(bookId)
           .then(setBookToEdit) 
            .catch(err => console.log('err:', err))
    }


    function onSaveBook(ev) {
        ev.preventDefault()

        if (!bookToEdit.title || !bookToEdit.listPrice.amount) {
            alert('Please enter both title and price.')
            return
        }

        bookService.save(bookToEdit)
            .then(() => navigate('/books'))
            .catch(err => console.log('err:', err))

    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break

            case 'checkbox':
                value = target.checked
                break

            default:
                break
        }

        if (field === 'price') {
            setBookToEdit(prevBook => ({
                ...prevBook,
                listPrice:
                    { ...prevBook.listPrice, amount: +value }
            }))
        } else {
            setBookToEdit(prevBooks => ({ ...prevBooks, [field]: value }))
        }

    }

    const { title, listPrice, thumbnail } = bookToEdit
    // const { amount } = listPrice

    return (
        <section className="book-edit">

            <h1>Edit Books</h1>

            <form onSubmit={onSaveBook}>
                <label htmlFor="title">Title:</label>
                <input required onChange={handleChange} value={title} type="text" name="title" id="title" />

                <label htmlFor="price">Price:</label>
                <input required onChange={handleChange} value={listPrice.amount || ''} type="number" name="price" id="price" />
                <button type="submit">Save</button>
            </form>

        </section>
    )
}