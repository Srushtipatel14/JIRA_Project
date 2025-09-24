'use client';
import Navbar from "./navbar/navbar";
import Footer from "./footer/footer";
import { useSearch } from "./context/searchContext";

const Homescreen = () => {
    return (
        <div className="container-fluid p-0">
            <Navbar />
            <Footer />
        </div>
    )
}

export default Homescreen;