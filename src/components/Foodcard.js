import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import '../style/Foodcard.css';

function Foodcard(props) {
    const navigate = useNavigate();
       
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