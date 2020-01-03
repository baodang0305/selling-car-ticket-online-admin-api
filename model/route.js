const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ROUTES = 'routes';
const route = new Schema(
    {
        getOnDeparture: Array,
        departureTime: Array,
        departure: String,
        destination: String,
        typeOfCar: String,
        distance: Number,
        fare: Number,
    },
    { collection: ROUTES }
);
const list = mongoose.model(ROUTES, route);

const listRoutes = async (req, res) => {
    list.find({}).exec((err, user) => {
        if (err) {
            console.log('load list that bai');
        }
        else {
            res.json(user)
        }
    })
}
const newRoute = async (newRoute) => {
    const NewRoute= new list(newRoute);
    NewRoute.save((err) => {});
}


const deleteRoute = async(name)=>{
    return await list.findByIdAndDelete(name)
}

const AddTime = async (id,time)=>{
    return await list.findByIdAndUpdate(id,{$push:{"departureTime":time}})
}
const AddLocation = async (id,departure)=>{
    return await list.findByIdAndUpdate(id,{$push:{getOnDeparture
        :departure}})
}



module.exports = {
    list: list,
    listRoutes: listRoutes,
    newRoute:newRoute,
    deleteRoute:deleteRoute,
    AddTime:AddTime,
    AddLocation:AddLocation,
};
