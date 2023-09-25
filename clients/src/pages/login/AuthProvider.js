import React, { Component } from 'react';
import { Navigate } from "react-router-dom";

class AuthProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: false,
            loading: true,
        };
    }

    componentDidMount() {
        const tempUser = localStorage.getItem('user');
        const user = JSON.parse(tempUser);
        if (user?.token) {
            this.setState({ isAuthenticated: true });
        }
        this.setState({ loading: false })
    }

    render() {
        const { loading } = this.state;

        if (this.state.isAuthenticated || loading) {
            return this.props.children;
        } else {
            return <Navigate to="/login" />
        }
    }
}

export default AuthProvider;