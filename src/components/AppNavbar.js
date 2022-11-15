import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Nav  from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/AppNavbar.css';
import SignupLogin from './SignupLogin';

function AppNavbar(props) {

  return (
    <Navbar className={props.page === 'landingPage'? 'navigation' : 'navigationOther'} variant="light ">{/*  navigationOther */}
        <Container className={props.page === 'landingPage'?'navigationContainer':'navigationContainerOther'}>  {/* navigationContainerOther */}
          <a title='Home' href="/" className={props.page === 'landingPage'?'navbarBrand':'navbarBrandOther'}><p>e!</p></a>{/*  navbar-brandOther */}
          <Nav className={props.page === 'landingPage'? 'nav':'navOther'}>{/*  navOther */}
          <SignupLogin />
          </Nav>
        </Container>        
    </Navbar>
  );
}

export default AppNavbar;