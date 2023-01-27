const Blog = require('./blog.model');
const ResetPassword = require('./resetPassword.model');
const User = require('./user.model');
const Server = require('./server');
const { request } = require('express');

module.exports = {
    Blog,
    ResetPassword,
    User,
    Server
}
