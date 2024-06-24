const { Link, Outlet } = ReactRouterDOM
export function AboutUs() {

    return (
        <section className="about-us">
            <h1>About us page</h1>
            <nav>
                <Link replace to="/about/team">Team</Link>
                <Link replace to="/about/goal">Goal</Link>

            </nav>
            <section>
                <Outlet/>
            </section>
        </section>
    )
}