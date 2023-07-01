import './HeaderAdmin.css';
import { dataHeaderAdmin } from "./dataHeaderAdmin.js";
import { Link, useLocation } from "react-router-dom";

function HeaderAdmin() {
    let { pathname } = useLocation();
    return (
        <div className='header-admin-container'>
            <div className='admin-text'>
                Pricing Chain
            
            </div>
            <div className='header-admin-router'>
                <ul className="ul-header">
					{dataHeaderAdmin.map((item, index) => (
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

export default HeaderAdmin;