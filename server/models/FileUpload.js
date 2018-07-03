const async = require('async');
const fs = require('fs');
const ejs = require('ejs');
const sharp = require('sharp'); // http://sharp.dimens.io/en/stable/api-output/#tobuffer

// Config
const c = require('../config/const.json');

// Lib

// DB
const dbConnectionHelper = require(__base + 'lib/db/dbConnectionHelper');

const FileUpload = {
  ////////////////////////////////////
  //////////       Image      ////////
  ////////////////////////////////////
  image: {
    /**
     * @param {File} query.file **required
     */
    upload: (query, callback) => {
    },
    /**
     * @param {String} query.url **required
     */
    delete: (query, callback) => {
    },
  },
}
module.exports = FileUpload;
