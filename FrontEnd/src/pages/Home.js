import Home from "../components/Home/Home"
import HeaderUser from"../components/HeaderUser/HeaderUser"

function HomePage() {
    return (
        <div className = 'Home'>
            <HeaderUser/>
            <Home/>
        </div>
    );
}

export default HomePage;