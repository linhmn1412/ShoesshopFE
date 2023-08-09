import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Carousel from "./Carousel/Carousel";
import '../../assets/css/style.css';
import Banner from "./Banner/Banner";
import ListProductHome from "./ListProductHome/ListProductHome";


const Home = () => {
    return ( 
        <div>
             <Header />
             <Carousel/>
             <Banner/>
             <ListProductHome/>
            <Footer/>
        </div>
       
     );
}
 
export default Home;