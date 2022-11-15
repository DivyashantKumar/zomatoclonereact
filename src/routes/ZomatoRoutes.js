import { Routes, Route } from "react-router-dom";
import LandingPage from '../components/LandingPage';
import RestaurantListContainer from '../components/RestaurantListContainer';
import RestaurantDetail from '../components/RestaurantDetail';

function ZomatoRoutes() {
    return (
        <Routes>
            <Route path="https://divyashantkumar.github.io/zomatoclonereact/" element={<LandingPage />} />
            <Route path="https://divyashantkumar.github.io/zomatoclonereact/restaurant/list/:timeFilter" element={<RestaurantListContainer />} />
            <Route path='https://divyashantkumar.github.io/zomatoclonereact/restaurant/:id' element={<RestaurantDetail />} />
            <Route path="*" element={<h1>404</h1>} />
        </Routes>
    );
}

export default ZomatoRoutes;