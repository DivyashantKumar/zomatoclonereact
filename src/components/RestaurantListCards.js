import { Col, Row } from "react-bootstrap";
import "../style/RestaurantListCards.css";
import { useNavigate } from "react-router-dom";


function RestaurantListCards(props) {
    const navigate = useNavigate();

    // let restaurantDetails = {...props};
    // console.log(restaurantDetails)

    return (
        <Row
            className="rightColRow g-0"
            onClick={() => toRestaurantPage(props.restaurants.code)}
        >
            <Row className="rowOne g-0 ">
                <Col className="col-3 columnOne g-0">
                    <img
                        src="https://github.com/DivyashantKumar/assignment-first/blob/main/images/1image.png?raw=true"
                        alt="food"
                    />
                </Col>
                <Col className="col-9 columnTwo g-0">
                    <h3>{props.restaurants.name}</h3>
                    <h6>FORT</h6>
                    <p>Shop 1, Plot D, Samaruddhi Complex, Chincholi</p>
                </Col>
            </Row>
            <hr />
            <Row className="rowTwo">
                <Col className="col-3 columnOne">
                    <p>CUISINE:</p>
                    <p className="costForTwo">COST FOR TWO:</p>
                </Col>
                <Col className="col-9 columnTwo">
                    <p>{enlistCuisine(props.restaurants.cuisine)}</p>
                    <p>₹ {props.restaurants.cost}</p>
                </Col>
            </Row>
        </Row>

    );

    function toRestaurantPage(restaurantId) {
        navigate(`/restaurant/${restaurantId}`);
    }

    function enlistCuisine(CuisineArray){
        return (CuisineArray.join(', '))
    }
}

export default RestaurantListCards;
