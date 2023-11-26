import { NavLink } from 'react-router-dom';
import '../../assets/sass/components/_footer.scss'
import cert from '../../assets/images/handle_cert.png';
const Footer = () => {
    return (
        <div className='footer'>
            <div>
                <div className="footer-contact">
                    <strong>CỔNG THÔNG TIN ĐIỆN TỬ PHÁP ĐIỂN</strong>
                    <p>
                        <strong>Địa chỉ: </strong> Trần Phú, Ba Đình, Hà Nội. <strong>Điện thoại: </strong> 024.62739660 Fax: 024.62739655 Email: <NavLink to={`mailto: banbientapphapdien@moj.gov.vn`}>banbientapphapdien@moj.gov.vn</NavLink>
                    </p>
                    <p>Giấy phép cung cấp thông tin trên internet số 28/GP-BC ngày 25/03/2005.</p>
                    <p>Trưởng Ban biên tập: Hồ Quang Huy - Cục trưởng Cục Kiểm tra văn bản quy phạm pháp luật.</p>
                    <p>Mọi thông tin phát hành lại từ cổng thông tin này phải ghi rõ nguồn “Cổng thông tin điện tử pháp điển: <NavLink target='_blank' to="https://phapdien.moj.gov.vn/Pages/home.aspx"> phapdien.moj.gov.vn</NavLink>”.
                    </p>
                    <br /><br />
                </div>
                <img src={cert} alt="Đây là hình ảnh cert" />
            </div>
        </div>
    );
}

export default Footer;