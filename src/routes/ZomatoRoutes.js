import { Routes, Route } from "react-router-dom";
import LandingPage from '../components/LandingPage';
import RestaurantListContainer from '../components/RestaurantListContainer';
import RestaurantDetail from '../components/RestaurantDetail';

function ZomatoRoutes() {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/restaurant/list/:timeFilter" element={<RestaurantListContainer />} />
            <Route path='/restaurant/:id' element={<RestaurantDetail />} />
            <Route path="*" element={<h1>404</h1>} />
        </Routes>
    );
}

export default ZomatoRoutes;