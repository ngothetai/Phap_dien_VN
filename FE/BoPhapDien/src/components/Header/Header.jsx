import { NavLink, useNavigate } from 'react-router-dom';
import '../../assets/sass/components/_header.scss';
import logo from '../../assets/images/logo.png';
import logoMobile from '../../assets/images/logoMobile.png';
const Header = () => {
    const navigate = useNavigate();
    return (
        <div className="header">
            <div>
                <picture>
                    <source media="(max-width: 480px)" srcSet={logoMobile} />
                    {/* <source media="(min-width: 768px)" srcSet={imageDesktop} /> */}
                    <img src={logo} alt="Logo" />
                </picture>


                <ul>
                    <li>
                        <NavLink to={"/"}>Trang chủ</NavLink>
                    </li>
                    <li>
                        <NavLink to={"/chatbot"} >Q & A</NavLink>
                    </li>
                    {/* <li>
                        <NavLink to={"/login"} >Đăng nhập</NavLink>
                    </li> */}
                </ul>
            </div>
        </div>
    )
}
export default Header;