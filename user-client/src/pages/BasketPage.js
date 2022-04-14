import React, { useState } from "react";
import Cookies from "js-cookie";
import { Alert, Button, Card, Col, Container, Row, Stack } from "react-bootstrap";
import axios from "axios";
import store from "../store/index";
import { exit, isLoggedIn } from "../services/index";
import interactors from "../services/interactors";

function ProductCard(props) {

  return (
    <Col xs={12} sm={6} md={4} lg={3} xl={2} xxl={1} className="m-0 p-0" key={props["id"]}>
      <Card className="h-100">
        <Card.Header className="h-100 d-flex align-items-center ">
          <h5 className="m-0 p-0">
            {props.name}
          </h5>
        </Card.Header>
        <Card.Body className="p-0 d-flex justify-content-between align-items-center">
          <button className="btn btn-secondary" onClick={() => { props.onDecrement() }}>-</button>

          <span>{props.amount}</span>
          <button className="btn btn-primary" onClick={() => { props.onIncrement() }}>+</button>
        </Card.Body>
      </Card>
    </Col>
  );

}

function BasketPage(props) {
  var currentUsername = store.getState().username;
  var currentBasket = store.getState().basket;
  var currentInflation = store.getState().inflation;

  const [username, setUsername] = useState(currentUsername);
  const [basket, setBasket] = useState(currentBasket);
  const [inflation, setInflation] = useState(currentInflation);
  const [calc, setCalc] = useState(false);
  
  store.subscribe(() => {
    setBasket(store.getState().basket);
    setUsername(store.getState().username);
    setInflation(store.getState().inflation)
  })
  
  const handleExit = async () => {
    await interactors.userClickedExitButton()
  }

  const increment = async (id) => {
    await interactors.userIncreasedAmountByGoodId(id)
  }

  const decrement = async (id) => {
    await interactors.userDecreasedAmountByGoodId(id)
  }

  const calculateInflation = async () => {
    await interactors.userClickedCalculateInflationOnBasketPage();
    setCalc(true);
  }

  return (
    <Container fluid className="border p-2 rounded ">
      <Row className="p-0 m-0 border-primary rounded">
        <Col className="p-0 m-0">
          <Alert className="m-0 ">
            <h1 className="m-0">
              Welcome {username}
            </h1>
          </Alert>
        </Col>
        <Col xs={"auto"} className="d-flex p-0 justify-content-end">
          <Button variant="danger" onClick={() => handleExit()}>Exit</Button>

        </Col>

      </Row>

      <Row className="bg-light  border-primary rounded p-1 m-0 ">
        <Col xs={12} className="p-1 m-0 border border-light">
          <h3 className="m-0 p-0">
            Your Basket:
          </h3>
        </Col>
        <Col className="m-0 p-0">
          <Row className=" border-secondary rounded m-0 p-0">
            {basket.map(element => {
              return (
                <ProductCard
                  key={element["id"]}
                  name={element["name"]}
                  amount={element["amount"]}
                  onIncrement={() => { increment(element["id"]) }}
                  onDecrement={() => { decrement(element["id"]) }} />
              )
            })}
          </Row>
        </Col>
      </Row>

      <Row className="bg-light border border-seconday rounded p-0 m-0">
        <Col className="p-1 m-0">
          <Button variant="success" onClick={() => { calculateInflation() }}>Calculate Inflation</Button>
        </Col>
        <Col className={"p-1 m-0 d-flex border-primary rounded justify-content-end align-items-center" + (calc ? " border" : " ")}>
          <p className="m-0">
            {inflation}
          </p>
        </Col>
      </Row>


    </Container>
  );

}

export default BasketPage;

