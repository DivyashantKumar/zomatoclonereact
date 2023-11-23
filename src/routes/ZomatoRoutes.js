import { Routes, Route } from "react-router-dom";
import LandingPage from '../components/LandingPage';
import RestaurantListContainer from '../components/RestaurantListContainer';
import RestaurantDetail from '../components/RestaurantDetail';
import PrivacyPolicy from "../pages/PrivacyPolicy";
import TermsOfServices from "../pages/TermsOfServices";

function ZomatoRoutes() {
    return (
        <Routes>
            <Route exact path="/" element={<LandingPage />} />
            <Route path="/restaurant/list/:timeFilter" element={<RestaurantListContainer />} />
            <Route path='/restaurant/:id' element={<RestaurantDetail />} />
            <Route path="/privacypolicy" element={<PrivacyPolicy />} />
            <Route path='/termofservices' element={<TermsOfServices />} />
            <Route path="*" element={<h1>404 Cannot find main Landing Page</h1>} />
        </Routes>
    );
}

export default ZomatoRoutes;