import '../assets/sass/components/_notfound.scss';
import notfoundImage from '../assets/images/not-found.png';
import { useNavigate } from 'react-router-dom';
const NotFound = () => {
    const navigate = useNavigate();
    return (
        <div className="not-found">
            <div>
                <img src={notfoundImage} alt="404" />
                <button onClick={() => navigate('/')}>Về trang chủ</button>
            </div>
        </div>
    )
}
export default NotFound;