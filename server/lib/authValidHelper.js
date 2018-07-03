'use strict';
const responseHelper = require(__base + 'lib/responseHelper')
const c = require(__base + 'config/const');

module.exports = {
    is_login: (request, response, next) => {
        if (!request.user) {
            console.log('authValidHelper :: is Not Logged in');
            responseHelper.err_send('AuthenticationFailed', response);
        } else {
            next();
        }
    },
    is_admin: (request, response, next) => {
        if (!request.user || c.admin.indexOf(request.user.email) == -1){
            responseHelper.err_code(403, "실패했습니다. 관리자 계정으로 로그인 해 주세요.</br><a href='https://www.recordfarm.com'>메인으로 가기</a>", response);
        } else {
            next();
        }
    }
}