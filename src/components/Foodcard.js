import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import '../style/Foodcard.css';

const API_endpoint = `https://api.openweathermap.org/data/2.5/weather?`;
const API_key = 'c5a48b3e59d242aedae7b2fb0b9ad0e4'

function Foodcard(props) {
    const navigate = useNavigate();
    // const [latitude, setLatitude] = useState('');
    // const [longitude, setLongitude] = useState('');

    // useEffect(()=>{
    //     navigator.geolocation.getCurrentPosition((location) => {
    //         setLatitude(location.coords.latitude);
    //         setLongitude(location.coords.longitude);
    //     })
    // })
    // console.log(props);
    
    return (
        <Card className = 'foodcard' onClick={toRestaurantList} style={{color:'red'}}>
            <Card.Img className='foodImage' variant="top" src={props.image} />
                <Card.Body className='cardBody'>
                    <Card.Title className='title'>{props.time}</Card.Title>
                    <Card.Text className='description'>{props.description}</Card.Text>
            </Card.Body>    
        </Card>            
    );

    function toRestaurantList () {
        navigate(`/restaurant/list/${props.code}`);
    }
}

export default Foodcard;