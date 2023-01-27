const { request, response } = require('express');
const { Category, Product, User } = require("../models");
const { ObjectId } = require('mongoose').Types;
const { Blog } = require('../models');
const allowedCollections = [
    'categories',
    'products',
    'roles',
    'users',
    'blogs',
];

/**
 * Metodo para buscar blogs con un termino de busqueda
 * @param {*} req 
 * @param {*} res 
 */
const blogsgetpagination = async ( req = request, res = respons) => {
    const filters = req.query;
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 4;
    const page = req.query.page ? parseInt(req.query.page) : 0;

    const [ totalBlogs, blogs ] = await Promise.all([
        Blog.countDocuments({delete:false, active:true}),
        Blog.find({})
            .like(filters)
            .sort({date: -1})
            .limit(pageSize)
            .skip(pageSize * page),
    ]);

    res.json({
        totalBlogs,
        blogs
    });
};

const searchCategories = async (item = '', res = response) => {
    const isMongoId = ObjectId.isValid(item);

    if(isMongoId){
        const category = await Category.findById(item)
            .populate('user', 'name');
        return res.json({
            result: (category) ? [category]:[]
        });
    }
    const regex = new RegExp(item, 'i');
    const [ count, categories ] = await Promise.all([
        Category.count({
            $or: [{name: regex}],
            $and: [{active:true}]
        }),
        Category.find({
            $or: [{name: regex}],
            $and: [{active:true}]
        }).populate('user', 'name'),
    ]);
    res.json({
        result: {
            count,
            categories
        }
    });

};

// const searchProducts = async (item = '', res = response) => {
//     const isMongoId = ObjectId.isValid(item);

//     if(isMongoId){
//         const product = await Product.findById(item)
//             .populate('user', 'name')
//             .populate('category', 'name');
//         return res.json({
//             result: (product) ? [product]:[]
//         });
//     }
//     const regex = new RegExp(item, 'i');
//     const [ count, products ] = await Promise.all([
//         Product.countDocuments({
//             $or: [{name: regex}],
//             $and: [{active:true}]
//         }),
//         Product.find({
//             $or: [{name: regex}],
//             $and: [{active:true}]
//         })
//             .populate('user', 'name')
//             .populate('category', 'name'),
//     ]);
//     res.json({
//         result: {
//             count,
//             products
//         }
//     });

// };

const searchBlogs = async (item = '', res = response) => {
    const isMongoId = ObjectId.isValid(item);

    if(isMongoId){
        const blog = await Blog.findById(item);
        return res.json({
            result: (blog) ? [blog]:[]
        });
    }
    const regex = new RegExp(item, 'i');
    const [ count, blog ] = await Promise.all([
        Blog.count({
            $or: [{name: regex}, {email: regex}],
            $and: [{active:true}]
        }),
        Blog.find({
            $or: [{name: regex}, {email: regex}],
            $and: [{active:true}]
        }),
    ]);
    res.json({
        result: {
            count,
            blog
        }
    });

};
const searchUsers = async (item = '', res = response) => {
    const isMongoId = ObjectId.isValid(item);

    if(isMongoId){
        const user = await User.findById(item);
        return res.json({
            result: (user) ? [user]:[]
        });
    }
    const regex = new RegExp(item, 'i');
    const [ count, users ] = await Promise.all([
        User.count({
            $or: [{name: regex}, {email: regex}],
            $and: [{active:true}]
        }),
        User.find({
            $or: [{name: regex}, {email: regex}],
            $and: [{active:true}]
        }),
    ]);
    res.json({
        result: {
            count,
            users
        }
    });

};

const search = (req= request, res= response ) => {
    const { collection, item } = req.params;

    if (!allowedCollections.includes(collection)){
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${allowedCollections}`,
        });
    }
    switch (collection){
        case'users':
            searchUsers(item, res);
            break;
        case'categories':
            searchCategories(item, res);
            break;
        case'blogs':
            searchBlogs(item, res);
            break;
        default:
            res.status(500).json({
                msg: 'Sele olvido hacer esta búsqueda'
            });
    }
};

module.exports = {
    blogsgetpagination,
    search
}
