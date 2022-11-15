import '../style/Header.css';
import Logo from './Logo';
import AppNavbar from './AppNavbar';
import HeaderTypeahead from './HeaderTypeahead';

function Header(){
    // const styleClass = {
    //     'navigation': 'navigation',
    //     'navigationContainer':'navigationContainer',
    //     'navbarBrand': 'navbarBrand',
    //     'nav': 'nav'
    // }
    
    return (
        <div className='headerContainer'>
            <img src='https://github.com/DivyashantKumar/assignment-first/blob/main/images/header%20Image.png?raw=true' alt="not found"/>
            <AppNavbar className='navBar' page='landingPage'/> 
            <Logo/>
            <div className='navHeading'>Find the best restaurants, cafés, and bars</div> 
            <HeaderTypeahead/>           
        </div>
    );
}

export default Header;