const { useParams, Link } = ReactRouterDOM

import { AddReview } from "../cmps/AddReview.jsx"
import { LongTxt } from "../cmps/LongTxt.jsx"
import { ReviewList } from "../cmps/ReviewList.jsx"
import { bookService } from "../services/book.service.js"
import { showErrorMsg } from "../services/event-bus.service.js"
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faHandPointRight } from '@fortawesome/free-solid-svg-icons'
// import { utilService } from "../services/util.service.js"

const { useEffect, useState } = React

export function BookDetails() {

    const [book, setBook] = useState(null)
    const [nextBookId, setNextBookId] = useState()
    const [prevBookId, setPrevBookId] = useState()

    const [isLoading, setIsLoading] = useState(false)
    const [isLoadingReview, setIsLoadingReview] = useState(false)
    const [isShowReviewModal, setIsShowReviewModal] = useState(false)

    const { bookId } = useParams()

    useEffect(() => {
        setIsLoading(true)

        bookService.get(bookId)
            .then(book => {
                setBook(book)

                bookService.getNextBookId(bookId)
                    .then(nextId => setNextBookId(nextId))

                bookService.getPrevBookId(bookId)
                    .then(prevId => setPrevBookId(prevId))
            })
            .catch(err => {
                console.error('Error fetching book details:', err)
                showErrorMsg('Failed to load book details')
            })
            .finally(() => {
                setIsLoading(false)
            })

    }, [bookId])

    const price = book && book.listPrice && (
        (book.listPrice.amount > 150) ? 'red' :
            (book.listPrice.amount < 20) ? 'green' : ''
    )

    function onToggleReview() {
        setIsShowReviewModal((prevIsShowReview) => !prevIsShowReview)
    }

    function onSaveReview(reviewToAdd) {
        setIsLoadingReview(true)
        bookService.saveReview(book.id, reviewToAdd)
            .then((review => {
                setBook(prevBook => {
                    const reviews = [review, ...prevBook.reviews]
                    return { ...prevBook, reviews }
                })
            }))
            .catch((err) => showErrorMsg('Save the review failed', console.log('err:', err)))
            .finally(() => setIsLoadingReview(false))
    }

    function onRemoveReview(reviewId) {
        setIsLoadingReview(true)
        bookService.removeReview(book.id, reviewId)
            .then(() => {
                const filteredReviews = book.reviews.filter(review => review.id !== reviewId)
                setBook({ ...book, reviews: filteredReviews })
            })
            .finally(() => setIsLoadingReview(false))
    }

    if (
        // !isLoading || 
        !book) return <div className="loader">Loading...</div>

    return (
        <section className="book-details">
            <h2>Book Title:{book.title}</h2>
            <h1>Book Subtitle:{book.subtitle}</h1>
            <h2>Book Author:{book.authors}</h2>
            <img src={book.thumbnail} alt="" />
            {book.listPrice.isOnSale && <img className="on-sale" src="assets/img/onSale.png" alt="" />}
            <h3 className={price}>Book Price:{book.listPrice.amount}</h3>
            <h4>Book Type:{book.categories}</h4>
            <h5>Book Published in:{book.publishedDate}</h5>
            {(2024 - book.publishedDate) < 1 && <p>New</p>}
            {(2024 - book.publishedDate) > 10 && <p>Vintage</p>}
            {book.pageCount > 500 && <p>Serious Reading</p>}
            {book.pageCount > 200 && book.pageCount < 500 && <p>Decent Reading</p>}
            {book.pageCount > 100 && book.pageCount < 200 && <p>Light Reading</p>}
            <LongTxt txt={book.description} />
            <button><Link to="/books">Return</Link></button>
            {/* <FontAwesomeIcon icon={faHandPointRight} /> */}

            <div>
                <button><Link to={`/books/${prevBookId}`}>Previous</Link></button>
                <button><Link to={`/books/${nextBookId}`}>Next</Link></button>
            </div>
            <button onClick={onToggleReview}>Add Review</button>
            {isShowReviewModal && (<AddReview
                toggleReview={onToggleReview}
                saveReview={onSaveReview}
            />
            )}

            {/* <div className="review-container">
                    <ReviewList reviews={book.reviews} onRemoveReview={onRemoveReview} />
                     
            </div> */}
        </section>
    )
}