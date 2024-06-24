const Router = ReactRouterDOM.HashRouter
const { Route, Routes, Navigate } = ReactRouterDOM

import { AboutGoal } from './cmps/AboutGoal.jsx'
import { AboutTeam } from './cmps/AboutTeam.jsx'
import { AppHeader } from './cmps/AppHeader.jsx'
import { Home } from './cmps/Home.jsx'
import { AboutUs } from './pages/AboutUs.jsx'
import { BookDetails } from './pages/BookDetails.jsx'
import { BookIndex } from './pages/BookIndex.jsx'

const { useState } = React

export function App() {


    return (
        <Router>
            <section className="app">
                <AppHeader />

                <main className="container  main-layout">
                    <Routes>
                        <Route path="/" element={<Navigate to="/home" />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/about" element={<AboutUs />} >
                            <Route path="/about/team" element={<AboutTeam/>} />
                            <Route path="/about/goal" element={<AboutGoal/>}/>
                        </Route>
                        <Route path="/books" element={<BookIndex />} />
                        <Route path="/books/:bookId" element={<BookDetails />} />
                    </Routes>
                </main>
            </section>
        </Router>
    )
}