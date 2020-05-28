import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import axios from "axios";

const HOST = "http://localhost:8001";

class Login extends Component {
    state = {
        username: "",
        password: ""
    };

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    handleSubmit = e => {
        e.preventDefault();

        axios
            .post(HOST + "/api/v2/login", this.state)
            .then(res => {
                localStorage.setItem("jwt", res.data.token);
                this.props.history.push("/users");
            })
            .catch(err => {
                console.log("Error", err);
            });
        this.setState({
            username: "",
            password: ""
        });
    };

    render() {
        return (
            <div class="container">
                <h2>Login</h2>
                <div className="Login">
                    <form onSubmit={this.handleSubmit}>
                        <FormGroup controlId="username" bsSize="large">
                            <ControlLabel>Username</ControlLabel>
                            <FormControl
                                placeholder="Enter Username"
                                type="username"
                                required
                            />
                        </FormGroup>
                        <FormGroup controlId="password" bsSize="large">
                            <ControlLabel>Password</ControlLabel>
                            <FormControl
                                placeholder="Enter Password"
                                type="password"
                                required
                            />
                        </FormGroup>
                        <Button block bsSize="large" type="submit">
                            Login
                        </Button>
                    </form>
                </div>
            </div>

        );
    }
}

export default Login;