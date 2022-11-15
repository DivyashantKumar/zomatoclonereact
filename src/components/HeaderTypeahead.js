import { useEffect, useState } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import { useNavigate } from 'react-router-dom';
import '../style/HeaderTypeahead.css';
import LocationTypeahead from './LocationTypeahead';
import {axiosInstanceWithoutToken} from '../api/axios';
import { BaseUrl } from '../api/index';

function HeaderTypeahead() {
    const navigate = useNavigate();
    const [selectedRestaurant, setSelectedRestaurant] = useState([]);
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState([]);
 
    useEffect(() => {

        if (selectedRestaurant.length > 0) {
            const restaurantCode = selectedRestaurant[0].code;
            navigate(`/restaurant/${restaurantCode}`)
        }
    }, [selectedRestaurant]);


    return (
        <div className='headerInput'>

            <LocationTypeahead filterRestaurent={restaurentFilter} />

            <Typeahead
                className='restaurentsInput'
                labelKey="name"
                id='restaurants'
                options={filteredRestaurants}
                placeholder="Choose a Restaurants..."
                selected={selectedRestaurant}
                onChange={setSelectedRestaurant}
                disabled={selectedLocation.length === 0}
            />
        </div>

    );

    function restaurentFilter(location) {
        setSelectedLocation([...location]);
        console.log("location");
        console.log(selectedLocation);

        if(location.length > 0){
            const location_code = location[0].code;
            const payloadToSend = {
                'params':{
                    'location_code': [location_code]
                }
            }

            axiosInstanceWithoutToken.get(`${BaseUrl}/getRestaurants`, payloadToSend).then((res) => {
                console.log("HeaderTypeahead");
                console.log(res.data.data.restaurants);
                setFilteredRestaurants(res?.data?.data?.restaurants)
            })
        }
    }
}

export default HeaderTypeahead;