
import { bookService } from "../services/book.service.js";
import { NumInputRating } from "./NumInputRating.jsx";
import { SelectRating } from "./SelectRating.jsx";
import { StarRating } from "./StarRating.jsx";
import { TextboxRating } from "./TextboxRating.jsx";

const { useState, useRef, useEffect } = React

export function AddReview({ saveReview, toggleReview }) {
    const inputRef = useRef()

    const [review, setReview] = useState({
        fullName: 'new name',
        rating: 0,
        date: new Date().toISOString().slice(0, 10),
        txt: '',
        selected: 0,
    })



    const [cmpType, setCmpType] = useState('stars')

    useEffect(() => {
        inputRef.current.focus()
    }, [])

    function onAddReview(ev) {
        ev.preventDefault()
        console.log('review:', review)
        review.date = new Date(date).getTime()
        saveReview(review)
        toggleReview()
    }

    function handleChange({ target }) {
        const { value, name: field } = target
        setReview((prevReview) => ({ ...prevReview, [field]: value }))
    }

    function onChangeCmpType(selectedType) {
        setCmpType(selectedType)
    }


    const { fullName, date, txt, rating } = review
    return <section className='review-add'>

        <form onSubmit={onAddReview} className='review-form'>
            <div className='review-modal'>
                <h1>Add review</h1>

                <label className='bold-txt' htmlFor='fullname'>Full name:</label>
                <input
                    autoFocus
                    ref={inputRef}
                    placeholder='Enter full name'
                    name='fullName'
                    type='text'
                    id='fullname'
                    value={fullName}
                    onChange={handleChange}
                    autoComplete='off'
                />
                <label className='bold-txt' htmlFor='date'>Date:</label>

                <input
                    type='date'
                    id='date'
                    name='date'
                    value={date}
                    onChange={handleChange}
                />

                <div className='rate-by-choice'>
                    <p className='bold-txt'>Select rating type:</p>
                    <input name='rating'
                        onChange={(ev) => onChangeCmpType(ev.target.value)}
                        id='select'
                        type="radio"
                        value='select' />
                    <label htmlFor="select">Select</label>

                    <input name='rating'
                        onChange={(ev) => onChangeCmpType(ev.target.value)}
                        id='numInput'
                        type="radio"
                        value='numInput' />
                    <label htmlFor="numInput">Number Input</label>

                    <input name='rating'
                        onChange={(ev) => onChangeCmpType(ev.target.value)}
                        id='stars'
                        type="radio"
                        value='stars' />
                    <label htmlFor="stars">Stars</label>

                </div>
                {cmpType === 'select' && <SelectRating handleChange={handleChange} rating={rating} />}
                {cmpType === 'numInput' && <NumInputRating handleChange={handleChange} rating={rating} />}
                {cmpType === 'stars' && <StarRating handleChange={handleChange} rating={rating} />}
                <TextboxRating handleChange={handleChange} txt={txt} />
                <button>Save</button>
                <button className='btn-toggle-modal'
                    onClick={toggleReview}>return
                </button>
            </div>
        </form>

    </section>
}


