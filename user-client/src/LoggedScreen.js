import React from "react";
import Cookies from "js-cookie";
import { Alert, Button, Card, Col, Container, Row, Stack } from "react-bootstrap";
import axios from "axios";
import { store } from "./stores/index";
import {exit,isLoggedIn} from "./services/index";

function ProductCard(props){


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


class LoggedScreen extends React.Component {
  constructor(props) {

    super(props);
    //this.setState({username:""});

    this.state = { username: store.getState().username, basket: [], inflation: "", calc: false }
    //this.getUsername();
    //this.getUsername = this.getUsername.bind(this);
  }

  componentDidMount() {
    this.setBasket();
    this.setUsername();
  }

  setUsername() {


  }

  setBasket() {
    console.log("BASKET IN STATE: " + JSON.stringify(store.getState()))
    const basket = store.getState().basket;
    this.setState({basket:basket})
    store.subscribe(() => {
      this.setState({basket:store.getState().basket})
    })
  }


  async setUsername() {
    const username = store.getState().username;
    if(username == null || (await isLoggedIn())){
      exit();
    }
    this.setState({username:username});
    store.subscribe(() => {
      this.setState({username: store.getState().username});
    })
  }


  handleExit = () => {


    console.log("exit");
    Cookies.remove("token");
    store.dispatch({ type: "redirect", path: "login" });
  }

  increment(id) {
    for (var i = 0; i < this.state.basket.length; i++) {
      if (this.state.basket[i].id == id) {
        this.state.basket[i].amount++;
      }
    }
    this.setState({ basket: this.state.basket });

  }

  decrement(id) {
    for (var i = 0; i < this.state.basket.length; i++) {
      if (this.state.basket[i].id == id) {
        if (this.state.basket[i].amount > 0)
          this.state.basket[i].amount--;
      }
    }
    this.setState({ basket: this.state.basket });
  }

  async calculateInflation() {
    console.log("BASKET " + JSON.stringify(this.state.basket));
    const res = await axios.post("http://localhost:8000/api/calculation", this.state.basket);
    console.log(JSON.stringify(res));
    const result = "Your inflation is %" + res.data.inflation
    this.setState({ inflation: result });
    console.log(this.state.inflation);
    this.setState({ calc: true });
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
                return(
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

export default LoggedScreen;



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
