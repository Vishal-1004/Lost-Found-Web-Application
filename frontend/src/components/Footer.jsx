import '../style/Footer.css';

const Footer = () => {
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
                  <span className="footer_link">Link 1</span>
                </div>
                <div className="l_footer_link">
                  <span className="footer_link">Link 2</span>
                </div>
              </div>
            </div>
            <div className="col-sm-3 col-md-3 my-2">
              <div className="l_footer_col">
                <p className="l_footer_head">Info</p>
              </div>
              <div className="l_footer_list">
                <div className="l_footer_link">
                  <span className="footer_link">Privacy Policy</span>
                </div>
                <div className="l_footer_link">
                  <span className="footer_link">Terms and Conditions</span>
                </div>
              </div>
            </div>
            <div className="col-sm-3 col-md-3 my-2">
              <div className="l_footer_col">
                <p className="l_footer_head">Our Team</p>
              </div>
              <div className="l_footer_list">
                <div className="l_footer_link">
                  <span className="footer_link">Member 1</span>
                </div>
                <div className="l_footer_link">
                  <span className="footer_link">Member 2</span>
                </div>
                <div className="l_footer_link">
                  <span className="footer_link">Member 3</span>
                </div>
              </div>
            </div>
            <div className="col-sm-3 col-md-3 my-2">
              <div className="l_footer_col">
                <p className="l_footer_head">Follow Us</p>
              </div>
              <div className="l_footer_link">
                <span className="footer_link">Instagram</span>
                
              </div>
              <div className="l_footer_link">
                <span className="footer_link">Facebook</span>
              </div>
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
  