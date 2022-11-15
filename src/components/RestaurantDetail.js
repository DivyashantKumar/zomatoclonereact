import { useParams } from "react-router-dom";
import AppNavbar from "./AppNavbar";
import React, { useEffect, useState } from 'react';
import { Carousel, Tab, Tabs, Container, Button, Row, Col } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import '../style/RestaurantDetail.css';
import { axiosInstanceWithoutToken } from '../api/axios';
import { BaseUrl } from '../api/index';

function RestaurantDetail() {
    const { id } = useParams();
    const [show, setShow] = useState(false);
    const [proceedShow, setProceedShow] = useState(false);
    let [count1, setCount1] = useState(0);
    let [count2, setCount2] = useState(0);
    let [count3, setCount3] = useState(0);
    const [calcPrice, setCalcPrice] = useState(0);
    const [restaurantDetails, setRestaurantDetails] = useState([]);

    useEffect(() => {
        axiosInstanceWithoutToken.get(`${BaseUrl}/getRestaurantDetails`, {
            "params": {
                "code": id
            }
        }).then((res) => {
            setRestaurantDetails([...res.data.data]);
        })
        console.log("Restaurant details")
        console.log(restaurantDetails);
    }, []);

    return (
        <>
            <AppNavbar page='Other' />
            <Container style={{ 'marginTop': '40px', 'marginBottom': '30px' }}>
                <Carousel className="carousal">
                    <Carousel.Item className="carousalItem" style={{ 'borderRadius': '0px', 'marginBottom': '30px' }}>
                        <img
                            src="https://github.com/DivyashantKumar/assignment-first/blob/main/2image2x.png?raw=true"
                            alt='idly'
                        />

                        <Carousel.Caption>
                            <h4>{restaurantDetails[0]?.name}</h4>
                            <p>Food Item Detail</p>
                        </Carousel.Caption>

                    </Carousel.Item>
                    <Carousel.Item className="carousalItem">
                        <img
                            src='https://github.com/DivyashantKumar/assignment-first/blob/main/3image2x.png?raw=true'
                            alt='idly'
                        />

                        <Carousel.Caption>
                            <h4>{restaurantDetails[0]?.name}</h4>
                            <p>Food Item Detail</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
                <h1>{restaurantDetails[0]?.name}</h1>

                <div className="placeOrderBtn">
                    <button type="button" onClick={() => placeOrderBtn()}>Place Online Order</button>

                    <Modal show={show} onHide={() => setShow(false)} dialogClassName="modal-90w" aria-labelledby="contained-modal-title-vcenter">
                        <Modal.Header closeButton className="modelHead" style={{ borderBottom: 'none' }}>
                            <Modal.Title id="contained-modal-title-vcenter" className="modalTitle">
                                {restaurantDetails[0]?.name}
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="modalBody">
                            <Container>
                                {
                                    restaurantDetails[0]?.menu?.map((item, index) => (
                                        <Row key={index} className="modalBodyRow">
                                            <Col md={9}>
                                                <div className="square">
                                                    <div className="vegCircle">
                                                    </div>
                                                </div>
                                                <p className="foodName">{item.name}</p>
                                                <p className="foodCost">{item.cost}</p>
                                                <p className="foodDisc">{item.disc}</p>
                                            </Col>
                                            <Col md={3} className='imgContainer'>
                                                <img src="https://github.com/DivyashantKumar/assignment-first/blob/main/2image2x.png?raw=true" alt="foodImage" />

                                                <div>
                                                    <button type="button" id={`${index}btn`} className="addButton" onClick={() => displayButton(index)}>ADD</button>

                                                    <div id={`${index}btnCont`} className="buttonCont">
                                                        <button type="button" className="decrease" onClick={() => decrement(index, item.cost)}>-</button>
                                                        <p id={`count${index + 1}`}>0</p>
                                                        <button type="button" className="increase" onClick={() => increment(index, item.cost)}>+</button>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                    ))
                                }

                                <Row className="subTotal">
                                    <Col md={8} style={{ display: 'flex' }}>
                                        <p>Subtotal</p>
                                        <p>&nbsp; &nbsp; &nbsp; {calcPrice}</p>
                                    </Col>
                                    <Col md={4} style={{ height: '50px' }}>
                                        <button type="button" className="payBtn" onClick={() => payNowBtn()} >Pay Now</button>
                                    </Col>
                                </Row>
                            </Container>
                        </Modal.Body>
                    </Modal>

                    <Modal show={proceedShow} onHide={() => proceedCrossBtn()} dialogClassName="modal-90w" aria-labelledby="contained-modal-title-vcenter">
                        <Modal.Header closeButton className="modelHead" style={{ borderBottom: 'none' }}>
                            <Modal.Title id="contained-modal-title-vcenter" className="modalTitle">
                                {restaurantDetails[0]?.name}
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="modalBody">
                            <Container>
                                <Row className="proceedModalBodyRow">
                                    <label>Name</label>
                                    <input type="text" name="name" placeholder="Enter your name" />
                                    <label>Mobile Number</label>
                                    <input type="text" name="mobNumber" placeholder="Enter mobile number" />
                                    <label>Address</label>
                                    <textarea placeholder="Enter your address"></textarea>
                                </Row>

                                <Row className="proceed">
                                    <Col md={12} style={{ height: '50px' }}>
                                        <button type="button" className="payBtn">Proceed</button>
                                    </Col>
                                </Row>
                            </Container>
                        </Modal.Body>
                    </Modal>
                </div>

                <Tabs
                    defaultActiveKey='Overview'
                    id="tab"
                    className='mb-3'
                >
                    <Tab title="Overview" eventKey="Overview" className="tabOne">
                        <h2>About this Place</h2>
                        <h4>Cuisine</h4>
                        <p>{restaurantDetails[0]?.overview}</p>
                        <h4>Average Cost</h4>
                        <p>₹700 for two people (approx.)</p>
                    </Tab>

                    <Tab title="Contact" eventKey="Contact" className="tabTwo">
                        <h5>Phone Number</h5>
                        <p className="mobNum">+91 114004566</p>
                        <h4>{restaurantDetails[0]?.name}</h4>
                        <p>Shop 1, Plot D, Samruddhi Complex, Chincholi, Mumbai-400002, Maharashtra</p>
                    </Tab>
                </Tabs>
            </Container>
        </>
    );

    function payNowBtn() {
        if (!sessionStorage.getItem('token')) {
            alert("Please Login to proceed ahead!");
        } else if (calcPrice === 0) {
            alert("Please Add something!");
        } else {
            setShow(false);
            setProceedShow(true);
        }
    }

    function proceedCrossBtn() {
        setShow(true);
        setProceedShow(false);
    }

    function placeOrderBtn() {
        setShow(true);
        setCount1(0);
        setCount2(0);
        setCount3(0);
        setCalcPrice(0)
    }

    function displayButton(id) {
        document.getElementById(`${id}btn`).style.display = "none";
        document.getElementById(`${id}btnCont`).style.display = "flex";
    }

    function increment(index, cost) {
        if (index === 0) {
            let num = parseInt(document.getElementById(`count${index + 1}`).innerHTML)
            setCount1(++num);
            let price = calcPrice + parseInt(cost);
            setCalcPrice(price);
            document.getElementById(`count${index + 1}`).innerHTML = num;
            // console.log(num)
        } else if (index === 1) {
            let num = parseInt(document.getElementById(`count${index + 1}`).innerHTML)
            setCount2(++num);
            let price = calcPrice + parseInt(cost);
            setCalcPrice(price);
            document.getElementById(`count${index + 1}`).innerHTML = num;
            // console.log(num)            
        } else {
            let num = parseInt(document.getElementById(`count${index + 1}`).innerHTML)
            setCount3(++num);
            let price = calcPrice + parseInt(cost);
            setCalcPrice(price);
            document.getElementById(`count${index + 1}`).innerHTML = num;
            // console.log(num)
        }
    }

    function decrement(index, cost) {
        if (index === 0) {
            let num = parseInt(document.getElementById(`count${index + 1}`).innerHTML)
            if (num > 0) {
                setCount1(--num);
                let price = calcPrice - parseInt(cost);
                setCalcPrice(price);
                document.getElementById(`count${index + 1}`).innerHTML = num;
                // console.log(num)
            }
        } else if (index === 1) {
            let num = parseInt(document.getElementById(`count${index + 1}`).innerHTML)
            if (num > 0) {
                setCount2(--num);
                let price = calcPrice - parseInt(cost);
                setCalcPrice(price);
                document.getElementById(`count${index + 1}`).innerHTML = num;
                // console.log(num)
            }
        } else {
            let num = parseInt(document.getElementById(`count${index + 1}`).innerHTML)
            if (num > 0) {
                setCount3(--num);
                let price = calcPrice - parseInt(cost);
                setCalcPrice(price);
                document.getElementById(`count${index + 1}`).innerHTML = num;
                // console.log(num)
            }
        }
    }

}

export default RestaurantDetail;