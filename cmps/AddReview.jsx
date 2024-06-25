import { BookDetails } from "../pages/BookDetails.jsx";
// import { bookService } from "../services/book.service.js";

export function AddReview() {

    return (
        <section>
            <h3>Reviews</h3>
            <form>
                <label htmlFor="fullname">Full Name:</label>
                <input type="text" name="fullname" id="fullname" />

                <label htmlFor="rating">Rating:</label>
                <select name="rating" id="rating">
                    <option value="1">.........⭐.........</option>
                    <option value="2">.......⭐⭐.......</option>
                    <option value="3">.....⭐⭐⭐.....</option>
                    <option value="4">...⭐⭐⭐⭐...</option>
                    <option value="5">.⭐⭐⭐⭐⭐.</option>
                </select>

                <label htmlFor="readAt">Read At:</label>
                <input type="date" name="readAt" id="readAt" />

                <label htmlFor="review">Full Name:</label>
                <input type="text" name="review" id="review" />
            </form>

        </section>
    )
}