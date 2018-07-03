module.exports = {
    // User
    auth: require('./Authentification'),
    fileUpload: require('./FileUpload'),

    init: () => {
        require('./Authentification');
        require('./FileUpload');
    },
}
