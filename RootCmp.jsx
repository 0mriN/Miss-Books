const Router = ReactRouterDOM.HashRouter
const { Route, Routes, Navigate } = ReactRouterDOM

import { AboutGoal } from './cmps/AboutGoal.jsx'
import { AboutTeam } from './cmps/AboutTeam.jsx'
import { AppHeader } from './cmps/AppHeader.jsx'
import { Home } from './cmps/Home.jsx'
import { AboutUs } from './pages/AboutUs.jsx'
import { BookDetails } from './pages/BookDetails.jsx'
import { BookEdit } from './pages/BookEdit.jsx'
import { BookIndex } from './pages/BookIndex.jsx'
import { UserMsg } from './pages/UserMsg.jsx'

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
                        <Route path="/books/edit" element={<BookEdit />} />
                        <Route path="/books/edit/:bookId" element={<BookEdit />} />
                        {/* the url is getting the edit to the id when trying to edit */}
                    </Routes>
                </main>
            </section>
            <UserMsg/>
        </Router>
    )
}