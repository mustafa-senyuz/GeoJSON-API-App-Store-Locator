//@desc get all stores
//@route GET methods
//@access public 
const Store = require('../models/Store');

exports.getStores = async (req,res,next)=>{
    try{
        const stores = await Store.find();

        return res.status(200).json({
            success:true , 
            count : stores.length,
            data : stores
        });
    }catch(err){
        console.log(err);
        res.status(500).json({error : 'Server error'});
    }
}


//@desc create all stores
//@route POST methods
//@access public 
exports.addStore = async (req,res,next)=>{
    try{
        console.log(req.body); 
        var store = await Store.create(req.body); // { storedID: '0000001', adress: 'Unterstrasse 3 Fussingen 65620' }

        return res.status(200).json({
            success : true ,
            data : store
        });
    }catch(err){
        console.log(err);
        if(err.code===11000){
            return res.status(400).json({error:"This store already exist"});
        }
        res.status(500).json({error : 'Server error'});
    }
}