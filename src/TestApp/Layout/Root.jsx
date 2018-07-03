import React, { Component } from 'react';
import {
    Link,
    withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router';

// Components
import HeaderComponent from './Header';
import FooterComponent from './Footer';
import HomeComponent from './Home/Home';
import FormComponent from './Forms';

// Actions
import * as ActionAuth from '../Data/Authentification/actions';

// Routes
import routes from '../routes';

// Styles
import styles from './TestAppLayout.css';

class RootView extends React.Component {
    componentDidMount() {
        this.props.dispatch(ActionAuth.session());
    }
    render() {
        return (
            <div>
                <div className={styles.contentContainer}>
                        <HeaderComponent />
                        <Route path={'/'} exact={true} strict={true} component={HomeComponent} />
                        <Route path={'/form'} exact={false} strict={false} component={FormComponent} />
                        <FooterComponent />
                </div>
            </div>
        );
    }
}
export default connect()(withRouter(RootView));
