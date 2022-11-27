import { Col, Row } from "react-bootstrap";
import "../style/RestaurantListCards.css";
import { useNavigate } from "react-router-dom";


function RestaurantListCards(props) {
    const navigate = useNavigate();

    // let restaurantDetails = {...props};
    // console.log(restaurantDetails)

    function toRestaurantPage(restaurantId) {
        navigate(`/restaurant/${restaurantId}`);
    }

    function enlistCuisine(CuisineArray){
        return (CuisineArray.join(', '))
    }

    return (
        <div
            className="rightColRow g-0"
            onClick={() => toRestaurantPage(props.restaurants.code)}
        >
            <div className="rowOne g-0 ">
                <div className="columnOne g-0">
                    <img
                        src="https://github.com/DivyashantKumar/assignment-first/blob/main/images/1image.png?raw=true"
                        alt="food"
                    />
                </div>
                <div className="columnTwo g-0">
                    <h3>{props.restaurants.name}</h3>
                    <h6>FORT</h6>
                    <p>Shop 1, Plot D, Samaruddhi Complex, Chincholi</p>
                </div>
            </div>
            <div className="rowTwo">
                <div className="columnOne">
                    <p>CUISINE:</p>
                    <p className="costForTwo">COST FOR TWO:</p>
                </div>
                <div className="columnTwo">
                    <p>{enlistCuisine(props.restaurants.cuisine)}</p>
                    <p>₹ {props.restaurants.cost}</p>
                </div>
            </div>
        </div>

    );
}

export default RestaurantListCards;
