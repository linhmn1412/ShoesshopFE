import { Link } from "react-router-dom";

const AccordionContent = ({id, link, name}) => {
    return ( 
        <li className="list-group-item">
          <Link
            to={link}
            className="text-dark"
          >
            {name}
          </Link>
        </li>

     );
}
 
export default AccordionContent;