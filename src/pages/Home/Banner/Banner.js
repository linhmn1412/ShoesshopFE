import BannerItem from "./BannerItem";
import sneaker from "../../../assets/images/sneakers.jpg";
import sandal from "../../../assets/images/sandals.jpg";
import slide from "../../../assets/images/slides.jpg";
const Banner = () => {
    return (  
        <div className="container py-5 my-4">
    <div className="row ">
        <BannerItem link = "/shop/category/Sneaker" img = {sneaker} content = "Sneaker"/>
        <BannerItem link = "/shop/category/Sandal" img = {sandal} content = "Sandal"/>
        <BannerItem link = "/shop/category/Slide" img = {slide} content = "Slide"/>
    </div>
</div>
    );
}
 
export default Banner;