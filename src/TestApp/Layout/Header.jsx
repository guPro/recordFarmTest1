import {
    Link,
} from 'react-router-dom'; //Library에서 Route 바탕으로 페이지간 이동 하게 해주는 react library Link
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import React from 'react';
import stylesForm from './Forms/Form.css';


// Styles
import styles from './TestAppLayout.css';


// Actions
import * as ActionAuth from '../Data/Authentification/actions';


class Header extends React.Component {
    logout() {
        this.props.dispatch(ActionAuth.logout());
    }

    render() {
        return (
            <div className={styles.headerContainer}>

                <div className={styles.navbar}>
                    <div className={styles.navbarContent}>
                        <ul style={{display: 'inline'}}>
                                <span className="mediaLeft">
                                <li><Link to="/"><img src="http://www.recordfarm.com/img/logo/logo_white.PNG"
                                                      style={{height: 23}}/></Link></li>
                                <li><Link to="/form/login" className={styles.redBtn + stylesForm.largeBtn}> 레코드 </Link></li>
                                <li><Link to="/form/signup"
                                          className={styles.redBtn + stylesForm.largeBtn}> 커뮤니티 </Link></li>
                                </span>
                            <span className="mediaRight">
                                <li className={styles.button}><Link to="/form/login"
                                                                    className={styles.redBtn + stylesForm.largeBtn}> 로그인 </Link></li>
                                <li className={styles.button}><Link to="/form/signup"
                                                                    className={styles.redBtn + stylesForm.largeBtn}> 회원가입 </Link></li>
                                <li className={styles.button}><Link to="form/upload"
                                                                    className={styles.redBtn + stylesForm.largeBtn}> 업로드 </Link></li>
                                </span>
                        </ul>
                    </div>
                </div>
            </div>


        );
    }
}

export default connect()(withRouter(Header));

