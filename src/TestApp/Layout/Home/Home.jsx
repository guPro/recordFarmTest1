import React from 'react';
import {
    Link,
} from 'react-router-dom';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
// CSS
import styles from '../TestAppLayout.css';
import Home from './Home.css';
import * as ActionAuth from '../../Data/Authentification/actions';
import * as ActionRecord from '../../Data/Records/actionRecords';
import Config from '../../Lib/Api/config';

class HomeView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            record: '',
            id: '',
            response: '',
            isRemember: false,
            records: [],
            popRank:[],
            hiphopRank:[],
            acousticRank:[],
            rockRank:[],

            from: 0,
            count: 5,
            sort: 'hot',

            genreArr: [6,3,5,4]
        };
        this.getRecords = this.getRecords.bind(this);
        this.getRank = this.getRank.bind(this);
    }

    componentWillMount() {
        this.getRecords();

       this.getRank(this.state.genreArr[0]);
       this.getRank(this.state.genreArr[1]);
       this.getRank(this.state.genreArr[2]);
       this.getRank(this.state.genreArr[3]);

    }

    getRecords() {
        this.props.dispatch(ActionRecord.getRecentRecords()).then((response) => {
            console.log(response);
            console.log('----------------');
            this.setState({records: response});
        }).catch((err) => {
            alert('레코드가져오기 실패');
            console.log(err);
        });
    }

/*    handleSort() {
        if (this.state.sort === 'hot') {
            this.setState({
                sort: 'new',
            })
        } else {
            this.setState({
                sort: 'hot',
            })
        }
        setTimeout(() => {
            this.getRecords();
        })
    }*/

    getRank(genre) {
        let params = {
            from: this.state.from,
            count: this.state.count,
            sort: this.state.sort,
            genre : genre,
        }

        this.props.dispatch(ActionRecord.getRecordRank(params)).then((response) => {
            console.log(response);
            console.log('---------------------ddd--------');
            switch (params.genre){
                case 6: this.setState({popRank: response})
                case 3: this.setState({hiphopRank: response})
                case 5: this.setState({acousticRank : response})
                case 4: this.setState({rockRank: response})
            }
        }).catch((err) => {
            console.log(err);
            alert('랭킹 가져오기 실패');
        });

    }

    render() {
        /*        let renderRecordList = this.state.records.map((item, index) => { //이렇게 함수를 명칭을 줘서 state에 넣고, return에서 부른다.
                    return ( <div key={index}>{item.data.title}</div>
                    );
                })*/
        let renderRecordList = this.state.records.map((record, index) => (
            <li key={index} className="recordListLi" style={{
                width: 100 / 7 + '%',
                position: 'relative',
                float: 'left',
                color: 'black'
            }}>
                <div className="imageSection">
                    <img className="image" src={record.data.image} style={{width: 107 + 'px', hight: 107 + 'px'}}/>
                </div>
                <div className="titleSection" style={{
                    width: 100 + '%',
                    position: 'relative',
                    float: 'left',
                    verticalAlign: 'top',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    fontWeight: 'bold'
                }}>
                    {record.data.title.toString()}
                </div>
                <div className="artistSection" style={{
                    width: 100 + '%',
                    position: 'relative',
                    float: 'left',
                    verticalAlign: 'top', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap'
                }}>
                    {record.data.artist[0].user.name.toString()}
                </div>
            </li>
        ));

        let rankList = (list) => {
            console.log(list);
            console.log('------------aaa-----------');
            return list.map((record, index) => {
                    return (
                        <div key={index} className={Home.recordRankLi} >
                            <div className={Home.recordRankNo}>{index}</div>
                            <div className={Home.recordRankPlay}>
                                <span className={Home.iconPlayLight}></span>
                                <span className={Home.iconPauseLight}></span>
                            </div>
                            <div className={Home.recordRankRight}>
                                <div className={Home.recordRankTitle}>{record.data.title.toString()}</div>
                                <div className={Home.recordRankArtist}> {record.data.artist[0].user.name.toString()}</div>
                            </div>
                        </div>
                    )
            }
            );
        }

        return (
            <div className={Home.container}>
                <div className={Home.first} style={{height: 566}}>
                    <div className={Home.firstContent} style={{marginLeft: 10 + 'vw'}}>
                        <img style={{verticalAlign: 'middle', marginTop: 160}}
                             src="http://www.recordfarm.com/assets/img/home/main_banner1_ko.png"/>
                        <hr/>
                        <button className="btn btn-primary">지금 등록하기</button>
                        <br/><br/>
                        <Link to="/" style={{color: 'white'}}>레코드팜 음악마켓, 이렇게 운영됩니다 > </Link>
                    </div>
                </div>
                <div className={Home.secondContent}
                     style={{marginTop: 50, width: 80 + 'vw', marginLeft: 10 + 'vw', contentAlign: 'center'}}>
                    지금 재생된 레코드<br/><br/>
                    <div className={Home.second}>
                        <ul className="recordList7">{renderRecordList}</ul>
                    </div>
                </div>
                <div className={Home.third} style={{height: 714 + 'px'}}>

                    <div className={Home.thirdContent}>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        레코드 순위
                        <br/>
                        <hr />
                        <div className={Home.homeRecordRank + ' row'}>
                            <div className="col-xs-6 col-sm-3">
                                <div className={Home.header + ' ' + Home.pop}></div>
                                <div className={Home.content + ' ' + Home.pop}>
                                    {rankList(this.state.popRank)}
                                </div>
                            </div>

                            <div className="col-xs-6 col-sm-3">
                                <div className={Home.header + ' ' + Home.hiphop}></div>
                                <div className={Home.content + ' ' + Home.hiphop}>
                                    {rankList(this.state.hiphopRank)}
                                </div>
                            </div>
                            <div className="col-xs-6 col-sm-3">
                                <div className={Home.header + ' ' + Home.acoustic}
                                     onClick="headerGenreClick('5')"></div>
                                <div className={Home.content + ' ' + Home.acoustic}>
                                    {rankList(this.state.acousticRank)}
                                </div>
                            </div>
                            <div className="col-xs-6 col-sm-3">
                                <div className={Home.header + ' ' + Home.rock} onClick="headerGenreClick('4')"></div>
                                <div className={Home.content + ' ' + Home.rock}>
                                    {rankList(this.state.rockRank)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect()(withRouter(HomeView));
//export default HomeView;
