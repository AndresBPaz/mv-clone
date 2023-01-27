const { Schema, model } = require('mongoose');

const BlogSchema =  Schema({
    name: {
        type: String,
    },
    slug: {
        type: String,
    },
    description: {
        type: String,
    },
    intro: {
        type: String,
    },
    date: {
        type: Date,
    },
    post_type : {
        type: String,
    },
    image: {
        type: String,
    },
    images: [{
        type: String
    }],
    active: {
        type: Boolean,
        default: true
    },
    delete: {
        type: Boolean,
        default: false
    }
});

BlogSchema.methods.toJSON = function () {
    const { __v, ...model } = this.toObject();
    return model;
}

module.exports = model('Blog',  BlogSchema);