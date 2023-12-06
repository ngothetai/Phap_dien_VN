import '../../assets/sass/components/_footer.scss'
import logoSchool from '../../assets/images/logoWhite.png';
import logoGroup from '../../assets/images/logoGroup.png';
const Footer = () => {
    return (
        <div className='footer'>
            <div>
                {/* <div className="footer-top">
                    <div className="about-us">
                        <h2 className="footer-title">VỀ CHÚNG TÔI</h2>
                        <p>
                            -Tên đội: The_Three_Amigos
                        </p>
                        <p>
                            -Thành viên:
                            <ul>
                                <li><a href="https://www.facebook.com/taingothe02" target='_blank'>Ngô Thế Tài</a></li>
                                <li><a href="https://www.facebook.com/toilavu02" target='_blank'>Nguyễn Văn Vũ</a></li>
                                <li><a href="https://www.facebook.com/profile.php?id=100029726374075" target='_blank'>Nguyễn Thị Trang</a></li>
                            </ul>
                        </p>
                    </div>
                </div> */}
            </div>
            <div className="footer-bottom">
                <img src={logoGroup} alt="" />
                Website được xây dựng và phát triển bởi đội <span> The_Three_Amigos</span>
            </div>
        </div>
    );
}

export default Footer;