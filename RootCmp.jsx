import { Home } from './cmps/Home.jsx'
import { AboutUs } from './pages/AboutUs.jsx'
import { BookIndex } from './pages/BookIndex.jsx'

const {useState} = React

export function App() {
    const [page,setPage] = useState('books')
    return (
        <section className="app">
            <header className="app-header full main-layout">
                <section>
                    <h1>My App</h1>
                    <nav className="app-nav">
                        <a onClick={()=> setPage('home')} href="#">Home</a>
                        <a onClick={()=> setPage('about')} href="#">About Us</a>
                        <a onClick={()=> setPage('books')} href="#">Books</a>

                    </nav>
                </section>
            </header>
            <main className="container">
                {page === 'home' && <Home />}
                {page === 'about' && <AboutUs/>}
                {page === 'books' && <BookIndex/>}
            </main>
        </section>
    )
}