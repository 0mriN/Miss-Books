import { utilService } from "../services/util.service.js"

const { useState, useEffect,useRef } = React

export function BookFilter({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    const onDebounce = useRef(utilService.debounce(onSetFilter,500))

    useEffect(() => {
       onDebounce.current(filterByToEdit)
    }, [filterByToEdit])

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

        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
        
    }

    const { title, price } = filterByToEdit

    return (
        <section className="book-filter">
            <form>
                <label htmlFor="title"><u>Title:</u></label>
                <input value={title} onChange={handleChange} name="title" type="text" id="title" />

                <label htmlFor="price"><u>Price:</u></label>
                <input value={price || ''} onChange={handleChange} name="price" type="number" id="price" />
            </form>
        </section>
    )
}