const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const saltRounds = 10;
const USERS = 'users';

const user = new Schema({
    fullName: String,
    birthDay: String,
    gender: String,
    address: String,
    phoneNumber: String,
    urlImg: String,
    typeAccount: String,
    email: String,
    password: String,

}, {
    collection: USERS
});

const list = mongoose.model(USERS, user);

const listUsers = async (req, res) => {
    list.find({}).exec((err, user) => {
        if (err) {
            console.log('load list that bai');
        }
        else {
            res.json(user)

        }
    })
}

const updateUser = async (values, email) => {
    return await list.findOneAndUpdate({ email: email }, {
        $set: {

            fullName: values.fullName,
            birthDay: values.birthDay,
            gender: values.gender,
            address: values.address,
            phoneNumber: values.phoneNumber,
            urlImg: values.urlImg,
            typeAccount: values.typeAccount,
            email: values.email,
        }
    });
}


const getUser = async (res, id) => {
    return await list.findById(id).then(foundUser => {
        if (!foundUser) {
            return "false"
        }
        res.json({
            fullName: foundUser.fullName,
            birthDay: foundUser.birthDay,
            gender: foundUser.gender,
            address: foundUser.address,
            phoneNumber: foundUser.phoneNumber,
            urlImg: foundUser.urlImg,
            typeAccount: foundUser.typeAccount,
            email: foundUser.email,
        })
    })
}

const deleteUser = async (email) => {
    return await list.findOneAndDelete({ email: email })
}
 const count = async(res)=>{
    return await list.aggregate( [
        {
          $group: {
              
            _id: null,
             data: { $sum:1 }
          }
        }
      ] ).exec((err,contract)=>{
        if(err){
            console.log(err);
        }
        else{
            res.json(contract)
        }
    })
}
module.exports = {
    list: list,
    listUsers: listUsers,
    updateUser: updateUser,
    getUser: getUser,
    deleteUser: deleteUser,
    count:count
}