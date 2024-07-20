import React, { Component } from "react";
import styles from "./PaymentMethodDetail.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
//import {
  //loginRequestWithOtp,
  //loginRequestWithOtpVerify,
//} from "../../../redux/authentication/actions";

class PaymentMethodDetail extends Component {
  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  render() {
    const { handleChange } = this;
    console.log(this.props);
    return (
      <>
        <div className="row ml-5">
          <span>
            <FontAwesomeIcon
              icon={faArrowLeft}
              color="rgb(238, 42, 36)"
              size="lg"
            />
          </span>
          <span id={styles.backBtn}>Modify your booking</span>
        </div>
        <div className="col-11 mt-4 offset-1 " id={styles.cardContainer}>
          <div className="row ">
            <div className="col-12" id={styles.saveMoney}>
              <span> Yay! you just saved ₹7241 on this booking!</span>
            </div>
            <div class="card w-100 ">
              <div class="card-body pt-0 px-3">
                <div className="row align-items-center" id={styles.heading}>
                  <div id={styles.first}>1</div>
                  <div id={styles.enterDetail}>
                    <span>Enter your details</span>
                  </div>
                </div>
                <div className="row" id={styles.detailDes}>
                  <span>
                    We will use these details to share your booking information
                  </span>
                </div>
                <div className="row">
                  <div className="col-12">
                    <form>
                      <div class="row">
                        <div class="col-6">
                          <label for="inputAddress">Name</label>
                          <input
                            type="text"
                            class="form-control"
                            placeholder="First name"
                            required
                          />
                        </div>
                        <div class="col-6">
                          <label for="inputEmail">Email</label>
                          <input
                            type="email"
                            class="form-control"
                            placeholder="enter email"
                            required
                          />
                        </div>
                        <div class="col-6 mt-3">
                          <label for="inputAddress">Mobile Number</label>
                          <input
                            name="mobile"
                            onChange={handleChange}
                            type="text"
                            class="form-control"
                            placeholder="Enter 10 digits Mobile Number"
                            required
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="card w-100 my-3 ">
              <div className="row m-0 align-items-center" id={styles.heading}>
                <div id={styles.first}>2</div>
                <div id={styles.enterDetail}>
                  <span>Complete your booking</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentMethodDetail);
