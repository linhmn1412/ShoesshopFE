import { Link } from "react-router-dom";

const NavItem = ({link, content}) => {
    return ( 
        <Link to={link}>
            <button type="button" className="btn btn-link px-3 me-2 primary-text">{content}</button>    
      </Link>
     );
}
 
export default NavItem;