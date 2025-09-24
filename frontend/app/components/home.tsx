'use client';
import Navbar from "./navbar/navbar";
import Footer from "./footer/footer";
import Project from "./project/project";

const Homescreen = () => {
    return (
       <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
            <Navbar />
            <div className="flex-grow-1 px-3">
                <Project/>
            </div>
            <Footer />
        </div>
    )
}

export default Homescreen;