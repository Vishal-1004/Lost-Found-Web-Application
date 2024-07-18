import '../style/Footer.css';
import { Link, useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  const handleLinkClick = (path) => {
    navigate(path);
    window.scrollTo(0,0)
  };

  return (
    <>
      <footer>
        <div className="row l-footer">
          <div className="col-sm-3 col-md-3 my-2">
            <div className="l_footer_col">
              <p className="l_footer_head">Quick Links</p>
            </div>
            <div className="l_footer_list">
              <div className="l_footer_link">
                <span className="footer_link" onClick={() => handleLinkClick('/lost')}>Lost</span>
              </div>
              <div className="l_footer_link">
                <span className="footer_link" onClick={() => handleLinkClick('/found')}>Found</span>
              </div>
              <div className="l_footer_link">
                <span className="footer_link" onClick={() => handleLinkClick('/about-us')}>About Us</span>
              </div>
            </div>
          </div>
          <div className="col-sm-3 col-md-3 my-2">
            <div className="l_footer_col">
              <p className="l_footer_head">Support Links</p>
            </div>
            <div className="l_footer_list">
              <div className="l_footer_link">
                <span className="footer_link" onClick={() => handleLinkClick('/contact')}>Contact us</span>
              </div>
              <div className="l_footer_link">
                <span className="footer_link" onClick={() => handleLinkClick('/')}>Privacy Policy</span>
              </div>
              <div className="l_footer_link">
                <span className="footer_link" onClick={() => handleLinkClick('/')}>Terms and Conditions</span>
              </div>
            </div>
          </div>
          <div className="col-sm-3 col-md-6 my-2 mx-0 md:mt-8">
            <Link to="/"><img
              className="sm:w-[150px] md:visible justify-start"
              src="https://cdn.codechef.com/images/cc-logo.svg"
              alt="Website Logo" /></Link>
            <p className='text-sm'>Lorem Ipsum  Lorem Ipsum</p>
          </div>
        </div>
      </footer>
      <div className="copy-right">
        <p className="copy-right-para">
          &copy; {new Date().getFullYear()} Copyright All Rights Reserved
        </p>
      </div>
    </>
  );
};

export default Footer;
