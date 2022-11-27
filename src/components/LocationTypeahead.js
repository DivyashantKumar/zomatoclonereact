import {axiosInstanceWithoutToken} from '../api/axios';
import { useState, useEffect } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import '../style/LocationTypeahead.css';
import { BaseUrl } from '../api/index';


function LocationTypeahead(props) {

    const [selectedLocation, setSelectedLocation] = useState([]);
    const [location, setLocation] = useState([]);

    useEffect(() => {
        axiosInstanceWithoutToken.get(`${BaseUrl}/getLocations`).then((res) => {
            // console.log("LocationTypeahead")
            // console.log(res?.data?.data);        
            setLocation(res?.data?.data);
        });
    },[]);

    useEffect(() =>{
        // console.log("I am SELECTED LOCATION");
        // console.log(selectedLocation);
        
        if(selectedLocation.length >= 0){
            props.filterRestaurent(selectedLocation);
            // console.log("I am SELECTED ");
            // console.log(selectedLocation);
        }
        
    }, [selectedLocation]);

    return (
        <Typeahead
            className={props.page === 'rlc' ? 'rlcLocInp' :'locationsInput'}
            labelKey="name"
            id='location'
            options={location}
            placeholder="Choose a Location..."
            selected={selectedLocation}
            onChange={setSelectedLocation}
        />);

}

export default LocationTypeahead;