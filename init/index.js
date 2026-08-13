const mongoose=require("mongoose");
const initdata=require("./data.js");
const Listing = require("../model/listing.js"); // fixed path and variable name
const { geocode } = require("../utils/geocoding.js");

const mongo_url = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(mongo_url);
}

const initDB= async()=>{
    // firstly delete all data to mention previously on database
    await Listing.deleteMany({});
    // for insertion the owner funalities and geocoding
    initdata.data=  await Promise.all(initdata.data.map(async (obj)=>{
      const geometry = obj.geometry || (await geocode(obj.location, obj.country));
      return {
        ...obj,
        owner:"6a30e193bfb469743d9ef455",
        geometry,
      };
    }));
    // after deletion insert data 
    await Listing.insertMany(initdata.data);
    // initdata = is obeject and data is key to acess sample data
    console.log("data was intilized");
};

initDB();