import { useParams } from "react-router-dom";
import { Container, Col, Row, Alert, Form, Pagination } from "react-bootstrap";
import { useState, useEffect } from "react";
import { axiosInstanceWithoutToken } from '../api/axios';
import { BaseUrl } from '../api/index';
import RestaurantListCards from "./RestaurantListCards";
import AppNavbar from "./AppNavbar";
import LocationTypeahead from "./LocationTypeahead";
import '../style/RestaurantListContainer.css';
import CuisineContainer from './CuisineContainer';
import CostContainer from './CostContainer';

let num = 0;
function RestaurantListContainer() {
    
    const limit = 2;
    const [sortBy, setSortBy] = useState("");
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
            "code": "BRF",
            "name": "Breakfast"
        },
        {
            "code": "LCH",
            "name": "Lunch"
        },
        {
            "code": "DNR",
            "name": "Dinner"
        },
        {
            "code": "SKS",
            "name": "Snacks"
        },
        {
            "code": "DRK",
            "name": "Drink"
        },
        {
            "code": "NGT",
            "name": "Night"
        }
    ];
    const { timeFilter } = useParams();
    // console.log(timeFilter);
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
    }, [payload, activePage, sortBy]);


    function filterTiming() {
        harcodedRestaurants.forEach((item) => {
            if (item.code === timeFilter) {
                setTiming(item.name);
            }
        });
    };


    function sortByOrder(sortBasedOn) {
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

    function updateActivePage(activePage) {
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

    function handleFilter() {
        const leftcol = document.getElementById('filterColumn');
        const dropdown = document.getElementById('dropdown');
        let btn = null;
        let text = null;

        if (++num === 1) {
            dropdown.appendChild(leftcol);
            btn = document.createElement("button");
            text = document.createTextNode("Apply");
            btn.setAttribute("id", "applyBtn");
            btn.appendChild(text);
            leftcol.appendChild(btn);
            leftcol.style.display = "block"
            btn.addEventListener("click", (event) => {
                num = 0;
                leftcol.style.display = "none";
            })
            ++num;
        } else {
            document.getElementById('applyBtn').remove();
            num = 0;
            leftcol.style.display = "none";
        }

    }

    return (
        <>
            <AppNavbar page='Other' />
            <div className="ResContainer" onLoad={filterTiming} >
                {/* {JSON.stringify(payload)} */}
                <div>
                    <h1>{timing} places {restLocation.length > 0 ? `in ${restLocation[0].name}` : "available"}</h1>
                </div>
                <Row className="lnrCont">
                    <div id="dropdown" className="row dropdown" onClick={() => handleFilter()}>
                        <div className="fsCont">
                            <h3>Filter / Sort</h3> <div><span>&#10095;</span></div>
                        </div>
                    </div>
                    <Col id="filterColumn" className='leftCol'>
                        <div>
                            <h5>Filters</h5>
                            <h6 className="loaction">Select Location</h6>

                            <div className="locationTypeahead">
                                <LocationTypeahead page="rlc" filterRestaurent={getLocationPayload} />
                            </div>

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
                        </div>
                    </Col>

                    <Col className='rightCol'>
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
            </div>

        </>
    );
}

export default RestaurantListContainer;