import React from "react";
import Cookies from "js-cookie";
import { Alert, Button, Card, Col, Container, Row, Stack } from "react-bootstrap";
import axios from "axios";
import  store  from "../store/index";
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


class BasketPage extends React.Component {
  constructor(props) {

    super(props);
    //this.setState({username:""});

    this.state = { username: null, basket: [], inflation: null, calc: false }
    //this.getUsername();
    //this.getUsername = this.getUsername.bind(this);
    this.bindBasket();
    this.bindUsername();
    this.bindInflation();
  }

  componentDidMount() {
    this.bindBasket();
    this.bindUsername();
    this.bindInflation();
  }


  bindInflation() {
    const inflation = store.getState().inflation;
    this.setState({ inflation: inflation })
    store.subscribe(() => {
      this.setState({ inflation: store.getState().inflation })
    })
  }

  bindBasket() {
    const basket = store.getState().basket;
    this.setState({ basket: basket })
    store.subscribe(() => {
      this.setState({ basket: store.getState().basket })
    })
  }


  bindUsername() {
    const username = store.getState().username;
    this.setState({ username: username });
    store.subscribe(() => {
      this.setState({ username: store.getState().username });
    })
  }


  handleExit = async () => {
    await interactors.userClickedExitButton()
  }

  increment = async (id) => {
    await interactors.userIncreasedAmountByGoodId(id)

  }


  decrement = async (id) => {
    await interactors.userDecreasedAmountByGoodId(id)
  }

  async calculateInflation() {
    await interactors.userClickedCalculateInflationOnBasketPage();
    console.log(store.getState().inflation)
    this.setState({calc:true})
  }

  

  render() {
    /*
*/



    return (
      <Container fluid className="border p-2 rounded ">
        <Row className="p-0 m-0 border-primary rounded">
          <Col className="p-0 m-0">
            <Alert className="m-0 ">
              <h1 className="m-0">
                Welcome {this.state.username}
              </h1>
            </Alert>
          </Col>
          <Col xs={"auto"} className="d-flex p-0 justify-content-end">
            <Button variant="danger" onClick={() => this.handleExit()}>Exit</Button>

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
              {this.state.basket.map(element => {
                return (
                  <ProductCard
                    name={element["name"]}
                    amount={element["amount"]}
                    onIncrement={() => { this.increment(element["id"]) }}
                    onDecrement={() => { this.decrement(element["id"]) }} />
                )
              })}
            </Row>
          </Col>
        </Row>

        <Row className="bg-light border border-seconday rounded p-0 m-0">
          <Col className="p-1 m-0">
            <Button variant="success" onClick={() => { this.calculateInflation() }}>Calculate Inflation</Button>
          </Col>
          <Col className={"p-1 m-0 d-flex border-primary rounded justify-content-end align-items-center" + (this.state.calc ? " border" : " ")}>
            <p className="m-0">
              {this.state.inflation}
            </p>
          </Col>
        </Row>


      </Container>
    );
  }


}

export default BasketPage;



/*{this.state.basket.map(element => {

  return <Col xs={12} sm={6} md={4} lg={3} xl={2} xxl={1} className="m-0 p-0" key={element["id"]}>
    <Card className="h-100">
      <Card.Header className="h-100 d-flex align-items-center ">
        <h5 className="m-0 p-0">
          {element["name"]}
        </h5>
      </Card.Header>
      <Card.Body className="p-0 d-flex justify-content-between align-items-center">
        <button className="btn btn-secondary" onClick={() => { this.decrement(element["id"]) }}>-</button>

        <span>{element["amount"]}</span>
        <button className="btn btn-primary" onClick={() => { this.increment(element["id"]) }}>+</button>
      </Card.Body>
    </Card>
  </Col>;
})
}*/
