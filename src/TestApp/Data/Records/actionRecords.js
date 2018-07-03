

// API
import * as HttpApi from '../../Lib/Api/index';

export const getRecentRecords = ( params ) => {
    return (dispatch) => {
        return HttpApi.get('GET_RECENT_RECORDS', params)
            .then((response) => {
                return Promise.resolve(response.data);
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    };
};

export const getRecordRank = ( params ) => {
    return (dispatch) => {
        return HttpApi.get('GET_RECORDS_RANK', params).then((response) => {
            return Promise.resolve(response.data);
        }).catch((err) => {
            return Promise.reject(err);
        });
    };
};

