export default {
	clientId: '8puWuJWZYls1Ylawxm6CMiYREhsGGSyw',
    //url: 'http://jivida.com',
    url: 'http://recordfarm.com',

    /////////////// Authentification /////////////
    GET_AUTH_GET_VERIFICATION_CODE: '/api/auth/sms/getVerificationCode', // {'countryDialCode': '82로 넣고 보내주시면 됩니다.','phoneNumber': '휴대폰번호','langCode': '(Option) kr이 default입니다.','force': '(Option) 무조건 SMS를 보낼 경우 true로 설정'}
    GET_AUTH_IS_ID_DUPLICATED: '/api/auth/is/idDuplicated',
    GET_AUTH_SESSION: '/api/auth/session', // {'countryDialCode': '82로 넣고 보내주시면 됩니다.','phoneNumber': '휴대폰번호','langCode': '(Option) kr이 default입니다.','force': '(Option) 무조건 SMS를 보낼 경우 true로 설정'}
    POST_AUTH_LOGIN: '/api/auth/login', //{'idText': '아이디 (4자 이상, 20자 이하)','password': '비밀번호',}
    POST_AUTH_SIGNUP: '/api/auth/signup', // {'countryDialCode': '82로 넣고 보내주시면 됩니다.','phoneNumber': '휴대폰번호','password': '비밀번호','idText': '아이디 (4자 이상, 20자 이하)','email': '이메일','name': '닉네임 (중복가능, 1자 이상, 25자 이하)','address': '(Option) 주소 (필수입력 아님)','type': '일반사용자는 1, 중개업자는 2'
    POST_AUTH_LOGOUT: '/api/auth/logout',
    POST_AUTH_CHANGE_PASSWORD: '/api/auth/password/change',
    GET_RECENT_RECORDS: '/api/music/list?sort=hot&from=0&count=7',
    GET_RECORDS_RANK: '/api/music/list',
};
