import {  NavLink } from "react-router-dom";

const MenuItem = ({id,link, icon, text}) => {
    return ( 
			<li key={id} className="nav-item hover-item px-3 py-1  text-capitalize" style={{fontSize :"14px"}}>
		<NavLink className="nav-link px-2    menu-item" to={link} activeClassName="active">
			<i className={icon}></i>
			&ensp;
			<span className="">{text}</span>
		</NavLink>
	</li>

        
     );
}
 
export default MenuItem;