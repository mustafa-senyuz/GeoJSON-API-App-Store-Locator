const mongoose = require('mongoose');
const geocoder = require('../utils/geocoder');

const StoreSchema = new mongoose.Schema({
    storeID:{
        type: String ,
        required : [true , 'please add a store ID'],
        unique : true ,
        trim : true ,
        maxlength : [1000 , "NUMBER OF STORE CANT BE MORE THAN 1000!!"]
    },
    address:{
        type : String ,
        required :[true , "PLEASE ADD AN ADRESS"]
    },
    location: {
        type: {
          type: String, // Don't do `{ location: { type: String } }`
          enum: ['Point'] // 'location.type' must be 'Point'
        
        },
        coordinates: {
            type  : [Number], //number array
            index : '2dsphere'
        },
        formattedAddress : String
    },
    createdAt : {
        type: Date , 
        default : Date.now
    }
});

//Geocode & create location 
StoreSchema.pre('save' , async function(next){
    const local =  await geocoder.geocode(this.address);
    this.location = {
        type : 'Point' ,
        coordinates : [local[0].longitude , local[0].latitude], 
        formattedAddress : local[0].formattedAddress
    }
    console.log(local);

    //DO NOT SAVE ADRSS , undefined value doesnnt load on DB
    /* this.address = undefined; */
    next();
});

module.exports = mongoose.model('Store' , StoreSchema);

