import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";

const Home = () => {
    return (
        <div className="home">
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
}
export default Home;