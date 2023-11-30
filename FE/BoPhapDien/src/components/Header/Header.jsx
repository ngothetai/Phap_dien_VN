import { NavLink, useNavigate } from 'react-router-dom';
import '../../assets/sass/components/_header.scss';
import logo from '../../assets/images/logo.png';
const Header = () => {
    const navigate = useNavigate();
    return (
        <div className="header">
            <div>
                <img onClick={() => navigate("/")} src={logo} alt="" />
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