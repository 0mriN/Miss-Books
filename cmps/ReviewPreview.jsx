import { StarRating } from "./StarRating.jsx";

export function ReviewPreview({ review, onRemoveReview }) {

    return (
        <section className="review-details">
            <h4>{review.fullName}</h4>
            <h5>{new Date(review.date).toLocaleDateString('he')}</h5>
            {review.rating !== 0 && <h3><StarRating rating={review.rating} /></h3>}
            <p>{review.txt}</p>
            <button className={"btn-remove-review"} onClick={() => onRemoveReview(review.id)}>x</button>
        </section>
    )
}