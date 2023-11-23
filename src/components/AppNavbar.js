import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/AppNavbar.css';
import SignupLogin from './SignupLogin';
import { useNavigate } from 'react-router-dom';

function AppNavbar(props) {
  const navigate = useNavigate();

  function navigateTo(path) {
    navigate(path);
  }
  
  return (
    <Navbar className={props.page === 'landingPage' ? 'navigation' : 'navigationOther'} variant="light ">{/*  navigationOther */}
      <Container className={props.page === 'landingPage' ? 'navigationContainer' : 'navigationContainerOther'}>  {/* navigationContainerOther */}
        <a title='Home' href="/" className={props.page === 'landingPage' ? 'navbarBrand' : 'navbarBrandOther'}><p>e!</p></a>{/*  navbar-brandOther */}
        <Nav className={props.page === 'landingPage' ? 'nav' : 'navOther'}>{/*  navOther */}
          <div className= {props.page === 'Other' ? 'authenticationButtonsOther' : 'authenticationButtons'}>
            <span title='PrivacyPolicy' onClick={() => { navigateTo('privacypolicy') }} className='anchor'>privacy policy</span>            
            <span title='TermOfServices' onClick={() => { navigateTo('/termofservices') }} className='anchor'>term of services </span>
            <SignupLogin /> 
          </div>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;