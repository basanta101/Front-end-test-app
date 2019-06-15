import React, { Component } from "react";
import axios from "axios";
import SliderComponent from "./SliderComponent";
import "./style.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      minRange: 500,
      maxRange: 5000,
      minMonth: 6,
      maxMonth: 24,
      enteredAmount: 500,
      enteredDuration: 6,
      interestRate: 0,
      monthlyPayment: {},
      showDisplayComponent: false
    };
  }
  handleAmount = props => {
    this.setState({
      enteredAmount: props,
      showDisplayComponent: false
    });
  };
  handleMonth = props => {
    this.setState({
      enteredDuration: props,
      showDisplayComponent: false
    });
  };
  calculateInterest = () => {
    axios
      .get(
        `https://ftl-frontend-test.herokuapp.com/interest?amount=${
          this.state.enteredAmount
        }&numMonths=${this.state.enteredDuration}`
      )
      .then(res => {
        // console.log(res.data);
        return this.setState({
          interestRate: res.data.interestRate,
          monthlyPayment: res.data.monthlyPayment,
          showDisplayComponent: true
        });
      });
  };

  render() {
    console.log("state", this.state);
    return (
      <div className="component">
        <div className="inside-component">
          <div className="main-container">
            <div className="title">
              <h3>Loan Calculator</h3>
            </div>
            <div className="select1">
              <div className="row1">
                <div className="row1-row1">
                  <div>Enter Loan Amount</div>
                  <div className="row1-row1-input">
                    <input
                      readOnly
                      type="number"
                      placeholder="enter amount "
                      value={this.state.enteredAmount}
                    />
                  </div>
                </div>
                <div className="row1-row2">
                  <SliderComponent
                    min={this.state.minRange}
                    max={this.state.maxRange}
                    onChange={this.handleAmount}
                  />
                </div>
              </div>
            </div>
            <div className="select2">
              <div className="row2">
                <div className="row2-row1">
                  <div>Enter Duration In Months</div>
                  <div className="row2-row1-input">
                    <input
                      readOnly
                      type="number"
                      placeholder="enter Month Duration "
                      value={this.state.enteredDuration}
                    />
                  </div>
                </div>
                <div className="row2-row2">
                  <SliderComponent
                    min={this.state.minMonth}
                    max={this.state.maxMonth}
                    onChange={this.handleMonth}
                  />
                </div>
              </div>
            </div>
            <button className="btn" onClick={this.calculateInterest}>
              Calculate Loan
            </button>
            {this.state.showDisplayComponent && (
              <div className="display-component">
                <div>
                  <span>Interest Rate: {this.state.interestRate * 100}% </span>
                </div>
                <div>
                  <span>Monthly Payment: </span>${" "}
                  {this.state.monthlyPayment.amount}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
