'use client';
import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Form, Button} from 'react-bootstrap';
import ErrorMessage from '../Components/ErrorMessage';
import axios from 'axios';
import {
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_LOGIN_SUCCESS,
    USER_UPDATE_FAIL
} from '../constants/UserConstants';



const Profile = ({history}) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setpassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState("");
    const [picMessage] = useState();
    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const userUpdate = useSelector((state) => state.userUpdate);
    const { error, success } = userUpdate;

    useEffect(() => {
        if (!userInfo) {
          history.push("/");
        } else {
          setName(userInfo.name);
          setEmail(userInfo.email);
        }
      }, [history, userInfo]);

    const updateProfile = (user) => async (getState) => {
        try {
          dispatch({ type: USER_UPDATE_REQUEST });
          const {
            userLogin: { userInfo },
          } = getState();
      
          const config = {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userInfo.token}`,
            },
          };
      
          const { data } = await axios.post("http://127.0.0.1:5000/profile", user, config);
      
          dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
      
          dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
      
          localStorage.setItem("userInfo", JSON.stringify(data));
        } catch (error) {
          dispatch({
            type: USER_UPDATE_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
          });
        }
    
        const handleSubmit = (event) => {
            event.preventDefault();
            dispatch(updateProfile({ name, email, password }));
    };

    
  
  
  
  
    return (
        <div>
        <h2 className='mb-3 text-primary'>Login</h2>
            <Row className="profileContainer">
              <Col md={6}>
                <Form onSubmit={handleSubmit}>
                  {success && (
                    <ErrorMessage variant="success">
                      Updated Successfully
                    </ErrorMessage>
                  )}
                  {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                  <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter Password"
                      value={password}
                      onChange={(e) => setpassword(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group controlId="confirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    ></Form.Control>
                  </Form.Group>{" "}
                  {picMessage && (
                    <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
                  )}
                  <Button type="submit" varient="primary">
                    Update
                  </Button>
                </Form>
              </Col>
              <Col
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
              </Col>
            </Row>
          </div>
        
      );
    };
};
export default Profile