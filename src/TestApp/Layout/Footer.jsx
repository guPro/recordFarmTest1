import React from 'react';

// Styles
import styles from './TestAppLayout.css';

class Footer extends React.Component {
    render() {
        return (
            <div id="footer" className="row">
                <div className={styles.footerContainer}>
                    <div className={styles.footerLogo}>
                        <img src="http://www.recordfarm.com/img/logo_recordfarm_gray.png"/>
                    </div>

                    <div className={styles.footerContainer2}>
                        <div className="facebookLike">

                            <div className="footerFacebook fbLike fbIframeWidget" id="fb1"
                                 data-href="https://www.facebook.com/mymusiccast?fref=ts" data-send="false"
                                 data-layout="button_count" data-action="like" data-show-faces="true" data-share="true">
                            <span style={{verticalAlign: 'bottom', width: '183px', height: '20px'}}><iframe
                                name="f226c336835253c" width="1000px" height="1000px" scrolling="no"
                                 title="fb:like Facebook Social Plugin"
                                src="https://www.facebook.com/v2.5/plugins/like.php?action=like&amp;app_id=&amp;channel=http%3A%2F%2Fstaticxx.facebook.com%2Fconnect%2Fxd_arbiter%2Fr%2FxaOI6zd9HW9.js%3Fversion%3D42%23cb%3Df3730c55850d7fc%26domain%3Dwww.recordfarm.com%26origin%3Dhttp%253A%252F%252Fwww.recordfarm.com%252Ff10f346e4c80148%26relation%3Dparent.parent&amp;container_width=559&amp;href=https%3A%2F%2Fwww.facebook.com%2Fmymusiccast%3Ffref%3Dts&amp;layout=button_count&amp;locale=ko_KR&amp;sdk=joey&amp;send=false&amp;share=true&amp;show_faces=true"
                                style={{border: 'none', visibility: 'visible', width: 183 + 'px', height: 20 + 'px'}}
                                className=""></iframe></span></div>
                        </div>

                        <div style={{fontSize: '12px', color: '#888', marginBottom: '10px'}}>ⓒ2015 Recordfarm Inc.</div>

                        <ul style={{height: '20px'}}>
                            <a href="/pages/introduce" target="_blank" className="ng-scope">회사소개</a>
                            <span>|</span>
                            <a href="/pages/privacy" target="_blank" className="ng-scope">개인정보</a>
                            <span>|</span>
                            <a href="/pages/useinf" target="_blank"className="ng-scope">이용약관</a>
                            <span>|</span>
                            <a href="/pages/cookie" target="_blank" className="ng-scope">Cookie</a>
                            <span>|</span>
                            <a href="/pages/policy" target="_blank" className="ng-scope">저작권 보호 요청 및 정책</a>
                            <span>|</span>
                            <a href="/pages/ads" target="_blank" className="ng-scope">배너
                                광고문의</a>
                            <span>|</span>
                            <a href="/pages/career" target="_blank" className="ng-scope">채용
                                정보</a>

                        </ul>
                    </div>

                    <div className={styles.footerButton}>
                        <div className="footerButtonSocial">
                            <a href="https://twitter.com/recordfarm">
                                <img src="http://www.recordfarm.com/img/icon/icon_footer_twitter.png"
                                     style={{marginLeft: '8px'}}/>
                            </a>
                            <a href="https://instagram.com/recordfarm">
                                <img src="http://www.recordfarm.com/img/icon/icon_footer_insta.png"
                                     style={{marginLeft: '8px'}}/>
                            </a>
                            <a href="https://www.facebook.com/mymusiccast?fref=ts">
                                <img src="http://www.recordfarm.com/img/icon/icon_footer_facebook.png"
                                     style={{marginLeft: '8px'}}/>
                            </a>
                        </div>

                        <div className="footerButtonDownload">
                            <a href="https://itunes.apple.com/kr/app/lekodeupam-recordfarm/id946722763?mt=8">
                                <img src="http://www.recordfarm.com/img/icon/banner_ios.png"/>
                            </a>
                            <a href="https://play.google.com/store/apps/details?id=com.recordfarm.recordfarm&amp;hl=ko">
                                <img src="http://www.recordfarm.com/img/icon/banner_android.png"/>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
                );
                }
                }

                export default Footer;
