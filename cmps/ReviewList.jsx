import { ReviewPreview } from "./ReviewPreview.jsx";

export function ReviewList({ reviews, onRemoveReview }) {

    return (
        <div>
            <h3>Users reviews</h3>
            {reviews.map(review =>
                <ReviewPreview
                    key={review.id}
                    review={review}
                    onRemoveReview={onRemoveReview} />
            )}
        </div>
    )
}