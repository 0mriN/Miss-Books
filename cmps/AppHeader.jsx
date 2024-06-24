const {Link,NavLink} = ReactRouterDOM


export function AppHeader(){

    return (
         <header className="app-header full main-layout">
                <section>
                    <h1>Omri's <br></br>Book Shop</h1>
                    <nav className="app-nav">
                        <NavLink to="/home">Home</NavLink> 
                        <NavLink to="/about">AboutUs</NavLink> 
                        <NavLink to="/books">Books</NavLink> 
                    </nav>
                </section>
            </header>
        
    )
}