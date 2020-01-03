const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BILLS = 'bills';
const bills = new Schema(
    {
        amount: String,
        email: String,
        month: String,
        distance: Number,
        year: Number,
    },
    { collection: BILLS }
);
const list = mongoose.model(BILLS, bills);

const listBills = async (req, res) => {
    list.find({}).exec((err, user) => {
        if (err) {
            console.log('load list that bai');
        }
        else {
            res.json(user)
        }
    })
}
const TOTAL = async(res)=>{
    return await list.aggregate( [
        {
          $group: {
              
            _id: null,
             data: { $sum:{$convert: { input:"$amount", to :"int"}} }
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

const Chart = async(res)=>{
    return await list.aggregate( [
        {

          $group: {
              
            _id: { month: "$month" },
             data: { $sum:{$convert: { input:"$amount", to :"int"}} },
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
    listBills: listBills,
    TOTAL:TOTAL,
    Chart: Chart
};
