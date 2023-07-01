import './HeaderUser.css';
import { dataHeaderUser } from "./dataHeaderUser.js";
import { Link, useLocation } from "react-router-dom";

function HeaderUser() {
    let { pathname } = useLocation();
    return (
        <div className='header-admin-container'>
            <div className='admin-text'>
                Pricing Chain
            
            </div>
            <div className='header-admin-router'>
                <ul className="ul-header">
					{dataHeaderUser.map((item, index) => (
						<li key={index} className="li-title">
							<Link
								to={item.linkPage}
								className={`link-title ${pathname === item.linkPage ? "active" : ""
									}`}
							>
								{item.title}
							</Link>
						</li>
					))}
				</ul>

            </div>
            
        </div>
    )
}

export default HeaderUser;