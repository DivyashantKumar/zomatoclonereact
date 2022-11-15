import { useParams } from "react-router-dom";
import { Container, Col, Row, Alert, Form, Pagination } from "react-bootstrap";
import { useState, useEffect } from "react";
import {axiosInstanceWithoutToken} from '../api/axios';
import { BaseUrl } from '../api/index';
import RestaurantListCards from "./RestaurantListCards";
import AppNavbar from "./AppNavbar";
import LocationTypeahead from "./LocationTypeahead";
import '../style/RestaurantListContainer.css';
import CuisineContainer from './CuisineContainer';
import CostContainer from './CostContainer';


function RestaurantListContainer() {

    const [sortBy, setSortBy] = useState("");
    const limit = 2;
    const cuisine = [
        {
            "code": "NI",
            "name": "North Indian"
        },
        {
            "code": "SI",
            "name": "South Indian"
        },
        {
            "code": "CHN",
            "name": "Chinese"
        },
        {
            "code": "FF",
            "name": "Fast Food"
        },
        {
            "code": "SF",
            "name": "Street Food"
        }
    ];
    const harcodedRestaurants = [
        {
            "code":"BRF",
            "name":"Breakfast"
        },
        {
            "code":"LCH",
            "name":"Lunch"
        },
        {
            "code":"DNR",
            "name":"Dinner"
        },
        {
            "code":"SKS",
            "name":"Snacks"
        },
        {
            "code":"DRK",
            "name":"Drink"
        },
        {
            "code":"NGT",
            "name":"Night"
        }
    ];
    const { timeFilter } = useParams();
    console.log(timeFilter);
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);
    const [timing, setTiming] = useState("");
    const [filteredCuisine, setFilteredCuisine] = useState([]);
    const [totalPages, setTotalPages] = useState([]);
    const [restLocation, setRestLocation] = useState([]);
    const [activePage, setActivePage] = useState(1);
    const [payload, setPayload] = useState({
        'timing_codes': [timeFilter]
    });

    useEffect(() => {
        console.log("PAyloadchanges")
        restaurentFilter();
    }, [payload,activePage, sortBy]);


    function filterTiming(){
        harcodedRestaurants.forEach((item)=> {
            if(item.code === timeFilter){
               setTiming(item.name);
            }
        });
    };

    return (
        <>
            <AppNavbar page='Other' />
            <Container className="ResContainer" onLoad={filterTiming}>
                {/* {JSON.stringify(payload)} */}
                <h1>{timing} places {restLocation.length>0? `in ${restLocation[0].name}` : "available"}</h1>
                <Row>
                    <Col className='col-3 leftCol'>
                        <h5>Filters</h5>
                        <h6 className="loaction">Select Location</h6>

                        <LocationTypeahead filterRestaurent={getLocationPayload} />

                        <h6 className="cuisine">Cuisine</h6>
                        <CuisineContainer cuisine={cuisine} getCuisine={getCuisinePayload} />

                        <h6 className="cost">Cost For Two</h6>
                        <CostContainer getCost={getCostPayload} />

                        <h6 className="sort">Sort</h6>
                        <Form className="mb-3">
                            <Form.Check
                                type="radio"
                                name="sort"
                                id="Price low to high"
                                label="Price low to high"
                                onChange={() => sortByOrder("lowtohigh")}
                            />
                            <Form.Check
                                type="radio"
                                name="sort"
                                label="Price high to low"
                                id="Price high to low"
                                onChange={() => sortByOrder("hightolow")}
                            />
                        </Form>

                    </Col>

                    <Col className='col-8 RightCol'>
                        {
                            filteredRestaurants.length === 0 && <Alert key='error' variant='danger'>Sorry no records found</Alert>
                        }
                        {filteredRestaurants.length > 0 && filteredRestaurants.map((item, index) =>
                            <RestaurantListCards
                                key={index}
                                restaurants={item}
                            />
                        )}

                        <Pagination className="pagenation">
                            {
                                totalPages.map((item, index) =>
                                    <Pagination.Item
                                        key={index}
                                        active={activePage === item + 1}
                                        onClick={() => updateActivePage(item + 1)}
                                    >
                                        {item + 1}
                                    </Pagination.Item>
                                )
                            }
                        </Pagination>
                    </Col>
                </Row>
            </Container>

        </>
    );

    function sortByOrder(sortBasedOn){
        setSortBy(sortBasedOn);
        setPayload({ ...payload, 'sortBy': sortBasedOn });
    }

    function restaurentFilter() {
        const defaultPayload = {
            'limit': limit,
            'page': activePage
        };

        const payloadToSend = {
            'params': { ...defaultPayload, ...payload }
        };

        axiosInstanceWithoutToken.get(`${BaseUrl}/getRestaurants`, payloadToSend).then((res) => {
            console.log(res?.data?.data?.restaurants);
            setFilteredRestaurants(res?.data?.data?.restaurants);
            
            const totalPagesArray = [];
            const totalPages = res?.data?.data?.total / limit;
            for (var i = 0; i < totalPages; i++) {
                totalPagesArray.push(i);
            }
            setTotalPages(totalPagesArray);
        });
    }

    function updateActivePage(activePage){
        setActivePage(activePage);
    }

    function getLocationPayload(location) {
        setRestLocation([...location]);
        if (location.length > 0) {
            setPayload({ ...payload, 'location_code': [location[0].code] });
        }
    }

    function getCuisinePayload(name) {

        if (filteredCuisine.find((item) => { return item === name; })) {
            const index = filteredCuisine.findIndex((item) => { return item === name; });
            filteredCuisine.splice(index, 1);
        } else {
            filteredCuisine.push(name);
            setFilteredCuisine([...filteredCuisine]);
        }
        setPayload({ ...payload, 'selectedCuisine': filteredCuisine });
    }

    function getCostPayload(cost) {
        const costRange = JSON.stringify(cost);
        // console.log("CostPayload");
        // console.log(costRange);
        setPayload({ ...payload, 'selectedCostRange': costRange });
    }
}

export default RestaurantListContainer;