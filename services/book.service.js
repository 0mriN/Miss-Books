import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'
const gNextId = 1
const BOOK_KEY = 'bookDB'
var gFilterBy = { title: '', price: 0 }
_createBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
    getNextBookId,
    getPrevBookId,
    getFilterBy,
    setFilterBy,
    saveReview,
    getEmptyReview,
    removeReview,

}

function query(gFilterBy = {}) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            if (gFilterBy.title) {
                const regex = new RegExp(gFilterBy.title, 'i')
                books = books.filter(book => regex.test(book.title))
            }
            if (gFilterBy.price) {
                books = books.filter(book => book.listPrice.amount >= gFilterBy.price)
            }
            return books
        })
}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
}

function remove(bookId) {
    return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
    if (book.id) {
        return storageService.put(BOOK_KEY, book)
    } else {
        return storageService.post(BOOK_KEY, book)
    }
}

function getEmptyBook(id = '', title = '', amount = 0, thumbnail = `http://coding-academy.org/books-photos/${gNextId}.jpg`) {
    const ctgs = ['Love', 'Fiction', 'Poetry', 'Computers', 'Religion']

    return {
        id,
        title,
        subtitle: utilService.makeLorem(4),
        authors: [utilService.makeLorem(1)],
        publishedDate: utilService.getRandomIntInclusive(1950, 2024),
        description: utilService.makeLorem(20),
        pageCount: utilService.getRandomIntInclusive(20, 600),
        categories: [ctgs[utilService.getRandomIntInclusive(0, ctgs.length - 1)]],
        thumbnail,
        language: "en",
        listPrice: {
            amount,
            currencyCode: "EUR",
            isOnSale: Math.random() > 0.7
        },
        reviews: [
            {
                id: utilService.makeId(0),
                fullName: utilService.makeLorem(1),
                rating: utilService.getRandomIntInclusive(1, 5),
                readAt: '06/24/2024'
            }
        ]
    }
}

function getFilterBy() {
    return { ...gFilterBy }
}

function setFilterBy(filterBy = {}) {
    if (filterBy.title !== undefined) gFilterBy.title = filterBy.title
    if (filterBy.price !== undefined) gFilterBy.price = filterBy.price
    return gFilterBy
}

function getNextBookId(bookId) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            let nextBookIdx = books.findIndex(book => book.id === bookId) + 1
            if (nextBookIdx === books.length) nextBookIdx = 0
            return books[nextBookIdx].id
        })
}
function getPrevBookId(bookId) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            let currentBookIdx = books.findIndex(book => book.id === bookId)
            let prevBookIdx = (currentBookIdx - 1 + books.length) % books.length
            return books[prevBookIdx].id
        })
}

function saveReview(bookId, review) {

    return get(bookId).then(book => {
        
        const thisReview = _createReview(review)
        book.reviews.unshift(thisReview)
        return save(book).then(() => thisReview)
    })
}

function getEmptyReview() {

    return {
        fullName: 'new name',
        rating: 0,
        readAt: new Date().toISOString().slice(0, 10),
        txt: '',
        selected: 0
    }
}

function removeReview(bookId, reviewId) {

    return get(bookId).then(book => {
        const newReviews = book.reviews.filter((review) => review.Id !== reviewId)
        book.reviews = newReviews
        return save(book)
    })
}

function _createBooks() {
    let books = utilService.loadFromStorage(BOOK_KEY)
    const ctgs = ['Love', 'Fiction', 'Poetry', 'Computers', 'Religion']
    if (!books || !books.length) {
        books = []
        for (let i = 0; i < 20; i++) {
            const book = {
                id: utilService.makeId(),
                title: utilService.makeLorem(2),
                subtitle: utilService.makeLorem(4),
                authors: [
                    utilService.makeLorem(1)
                ],
                publishedDate: utilService.getRandomIntInclusive(1950, 2024),
                description: utilService.makeLorem(20),
                pageCount: utilService.getRandomIntInclusive(20, 600),
                categories: [ctgs[utilService.getRandomIntInclusive(0, ctgs.length - 1)]],
                thumbnail: `./assets/img/${i + 1}.jpg`,
                language: "en",
                listPrice: {
                    amount: utilService.getRandomIntInclusive(80, 500),
                    currencyCode: "EUR",
                    isOnSale: Math.random() > 0.7
                }
            }
            books.push(book)
        }
        console.log('books', books)
        utilService.saveToStorage(BOOK_KEY, books)
    }
}

function _createBook(title, price = 150) {
    const book = getEmptyBook(title, price)
    book.id = utilService.makeId()
    return book
}

function _createReview(review) {
    return {
        id: utilService.makeId(),
        ...review,
    }
}