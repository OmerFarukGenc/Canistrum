import React from "react";
import Cookies from "js-cookie";
import { Alert, Button } from "react-bootstrap";
import axios from "axios";



class LoggedScreen extends React.Component {
  constructor(props) {

    super(props);
    //this.setState({username:""});

    this.state = { username: "", basket: [], inflation: "" }
    //this.getUsername();
    //this.getUsername = this.getUsername.bind(this);
  }

  componentDidMount() {
    this.getUsername();
    this.getGoodList();

  }

  async getGoodList() {
    const res = await axios.get("http://localhost:8000/api/crud/good");
    //console.log(JSON.stringify(res));
    var tempBasket = [];
    for (var g in res.data) {
      tempBasket.push({ id: res.data[g]._id, name: res.data[g].name, amount: 0 })
    }
    this.setState({ basket: tempBasket });
    console.log(JSON.stringify(this.state.basket));
  }

  async getUsername() {
    console.log(Cookies.get("token"));
    try {
      const res = await axios.get("http://localhost:8000/api/profile/whoami", { withCredentials: true });
      if (res.status = 200) {
        this.setState({ username: res.data.username });
        return;
        //return <span>res.data.username</span>;
      }
    } catch (err) {
      console.log(err);
      window.location = "/login";
    }
  }

  handleExit = () => {
    console.log("exit");
    Cookies.remove("token");
    window.location = "/login";
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
    const result = "Your inflastion is %" + res.data.inflation
    this.setState({ inflation:  result  });
    console.log(this.state.inflation);
  }

 

  render() {
    return (<div><p>welcome {this.state.username}</p>

      <Button onClick={() => this.handleExit()}>exit</Button>

      <ul>
        {this.state.basket.map(element => {

          return <li key={element["id"]}>
            {element["name"]}
            <button onClick={() => { this.decrement(element["id"]) }}>-</button>
            {element["amount"]}
            <button onClick={() => { this.increment(element["id"]) }}>+</button>
          </li>;
        })
        }
      </ul>

      <button onClick={() => { this.calculateInflation() }}>Calculate Inflation</button>

      <div key="inf">{this.state.inflation}
      </div>


    </div>);
  }


}

export default LoggedScreen;