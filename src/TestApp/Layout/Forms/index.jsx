import React, { Component } from 'react';
import { Switch, Route } from 'react-router';

// CSS
import styles from '../TestAppLayout.css';
import stylesForm from './Form.css';

// Components
import SignupComponent from './Signup';
import LoginComponent from './Login';
class RequestView extends React.Component {
    render() {
        return (
            <div className>
                <div className={stylesForm.formContainer}>
                    <Route path={'/form/login'} component={LoginComponent} />
                    <Route path={'/form/signup'} exact={true} strict={true} component={SignupComponent} />
                </div>
            </div>
        );
    }
}
export default RequestView;
