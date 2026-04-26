const mongoose = require("mongoose");
const Worker = require("./models/Worker");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI);

const workers = [

/* PLUMBERS */

{
name:"Rahul Sharma",
email:"rahul@test.com",
phone:"9876500001",
password:"123456",
categories:["Plumber"],
skills:[
{name:"Pipe Repair",category:"Plumber",experience:5},
{name:"Leak Fixing",category:"Plumber",experience:4}
],
pricing:{baseRate:300},
rating:{average:4.5,count:20}
},

{
name:"Vikas Singh",
email:"vikas@test.com",
phone:"9876500002",
password:"123456",
categories:["Plumber"],
skills:[
{name:"Bathroom Fitting",category:"Plumber",experience:6},
{name:"Drain Cleaning",category:"Plumber",experience:5}
],
pricing:{baseRate:350},
rating:{average:4.4,count:18}
},

{
name:"Ramesh Gupta",
email:"ramesh@test.com",
phone:"9876500003",
password:"123456",
categories:["Plumber"],
skills:[
{name:"Tap Fixing",category:"Plumber",experience:4},
{name:"Pipeline Setup",category:"Plumber",experience:5}
],
pricing:{baseRate:280},
rating:{average:4.2,count:15}
},

{
name:"Sunil Patel",
email:"sunil@test.com",
phone:"9876500004",
password:"123456",
categories:["Plumber"],
skills:[
{name:"Motor Installation",category:"Plumber",experience:7},
{name:"Water Tank Repair",category:"Plumber",experience:6}
],
pricing:{baseRate:420},
rating:{average:4.7,count:30}
},

{
name:"Amit Yadav",
email:"amitplumber@test.com",
phone:"9876500005",
password:"123456",
categories:["Plumber"],
skills:[
{name:"Pipe Installation",category:"Plumber",experience:5}
],
pricing:{baseRate:310},
rating:{average:4.3,count:17}
},

{
name:"Deepak Kumar",
email:"deepakplumber@test.com",
phone:"9876500006",
password:"123456",
categories:["Plumber"],
skills:[
{name:"Leak Repair",category:"Plumber",experience:4}
],
pricing:{baseRate:290},
rating:{average:4.1,count:12}
},

/* ELECTRICIANS */

{
name:"Arjun Verma",
email:"arjun@test.com",
phone:"9876500011",
password:"123456",
categories:["Electrician"],
skills:[
{name:"House Wiring",category:"Electrician",experience:6},
{name:"Switch Repair",category:"Electrician",experience:5}
],
pricing:{baseRate:350},
rating:{average:4.6,count:22}
},

{
name:"Rohit Tiwari",
email:"rohit@test.com",
phone:"9876500012",
password:"123456",
categories:["Electrician"],
skills:[
{name:"Fan Installation",category:"Electrician",experience:4}
],
pricing:{baseRate:300},
rating:{average:4.2,count:16}
},

{
name:"Ankit Singh",
email:"ankit@test.com",
phone:"9876500013",
password:"123456",
categories:["Electrician"],
skills:[
{name:"MCB Repair",category:"Electrician",experience:5}
],
pricing:{baseRate:320},
rating:{average:4.3,count:18}
},

{
name:"Mohit Sharma",
email:"mohit@test.com",
phone:"9876500014",
password:"123456",
categories:["Electrician"],
skills:[
{name:"Socket Installation",category:"Electrician",experience:3}
],
pricing:{baseRate:280},
rating:{average:4.1,count:14}
},

{
name:"Sahil Gupta",
email:"sahil@test.com",
phone:"9876500015",
password:"123456",
categories:["Electrician"],
skills:[
{name:"Light Installation",category:"Electrician",experience:4}
],
pricing:{baseRate:300},
rating:{average:4.0,count:10}
},

{
name:"Karan Mehta",
email:"karan@test.com",
phone:"9876500016",
password:"123456",
categories:["Electrician"],
skills:[
{name:"Inverter Setup",category:"Electrician",experience:6}
],
pricing:{baseRate:370},
rating:{average:4.5,count:19}
},

/* CARPENTERS */

{
name:"Rajesh Yadav",
email:"rajesh@test.com",
phone:"9876500021",
password:"123456",
categories:["Carpenter"],
skills:[
{name:"Furniture Repair",category:"Carpenter",experience:6}
],
pricing:{baseRate:400},
rating:{average:4.6,count:25}
},

{
name:"Sunil Kumar",
email:"sunilcarp@test.com",
phone:"9876500022",
password:"123456",
categories:["Carpenter"],
skills:[
{name:"Table Making",category:"Carpenter",experience:5}
],
pricing:{baseRate:350},
rating:{average:4.4,count:20}
},

{
name:"Manoj Singh",
email:"manoj@test.com",
phone:"9876500023",
password:"123456",
categories:["Carpenter"],
skills:[
{name:"Wood Cutting",category:"Carpenter",experience:7}
],
pricing:{baseRate:420},
rating:{average:4.7,count:29}
},

{
name:"Pankaj Sharma",
email:"pankaj@test.com",
phone:"9876500024",
password:"123456",
categories:["Carpenter"],
skills:[
{name:"Wardrobe Repair",category:"Carpenter",experience:4}
],
pricing:{baseRate:320},
rating:{average:4.2,count:17}
},

{
name:"Akhil Verma",
email:"akhil@test.com",
phone:"9876500025",
password:"123456",
categories:["Carpenter"],
skills:[
{name:"Door Repair",category:"Carpenter",experience:3}
],
pricing:{baseRate:300},
rating:{average:4.0,count:12}
},

{
name:"Ravi Patel",
email:"ravicarp@test.com",
phone:"9876500026",
password:"123456",
categories:["Carpenter"],
skills:[
{name:"Cabinet Making",category:"Carpenter",experience:6}
],
pricing:{baseRate:410},
rating:{average:4.5,count:21}
},

/* AC TECHNICIANS */

{
name:"Imran Khan",
email:"imran@test.com",
phone:"9876500031",
password:"123456",
categories:["AC Repair"],
skills:[
{name:"AC Service",category:"AC Repair",experience:6}
],
pricing:{baseRate:500},
rating:{average:4.7,count:26}
},

{
name:"Faizan Ali",
email:"faizan@test.com",
phone:"9876500032",
password:"123456",
categories:["AC Repair"],
skills:[
{name:"Gas Filling",category:"AC Repair",experience:5}
],
pricing:{baseRate:480},
rating:{average:4.5,count:22}
},

{
name:"Nadeem Khan",
email:"nadeem@test.com",
phone:"9876500033",
password:"123456",
categories:["AC Repair"],
skills:[
{name:"Cooling Repair",category:"AC Repair",experience:7}
],
pricing:{baseRate:520},
rating:{average:4.8,count:30}
},

{
name:"Sahil Shaikh",
email:"sahilac@test.com",
phone:"9876500034",
password:"123456",
categories:["AC Repair"],
skills:[
{name:"AC Installation",category:"AC Repair",experience:4}
],
pricing:{baseRate:450},
rating:{average:4.3,count:18}
},

{
name:"Aslam Sheikh",
email:"aslam@test.com",
phone:"9876500035",
password:"123456",
categories:["AC Repair"],
skills:[
{name:"Filter Cleaning",category:"AC Repair",experience:3}
],
pricing:{baseRate:420},
rating:{average:4.1,count:13}
},

{
name:"Yusuf Khan",
email:"yusuf@test.com",
phone:"9876500036",
password:"123456",
categories:["AC Repair"],
skills:[
{name:"Compressor Repair",category:"AC Repair",experience:6}
],
pricing:{baseRate:510},
rating:{average:4.6,count:24}
},

/* PAINTERS */

{
name:"Ajay Gupta",
email:"ajay@test.com",
phone:"9876500041",
password:"123456",
categories:["Painter"],
skills:[
{name:"Wall Painting",category:"Painter",experience:5}
],
pricing:{baseRate:320},
rating:{average:4.3,count:15}
},

{
name:"Neeraj Sharma",
email:"neeraj@test.com",
phone:"9876500042",
password:"123456",
categories:["Painter"],
skills:[
{name:"Texture Design",category:"Painter",experience:6}
],
pricing:{baseRate:380},
rating:{average:4.5,count:20}
},

{
name:"Sanjay Verma",
email:"sanjay@test.com",
phone:"9876500043",
password:"123456",
categories:["Painter"],
skills:[
{name:"Exterior Painting",category:"Painter",experience:7}
],
pricing:{baseRate:420},
rating:{average:4.7,count:28}
},

{
name:"Kunal Mehta",
email:"kunal@test.com",
phone:"9876500044",
password:"123456",
categories:["Painter"],
skills:[
{name:"Interior Painting",category:"Painter",experience:4}
],
pricing:{baseRate:330},
rating:{average:4.2,count:16}
},

{
name:"Rohit Jain",
email:"rohitpaint@test.com",
phone:"9876500045",
password:"123456",
categories:["Painter"],
skills:[
{name:"Wall Putty",category:"Painter",experience:3}
],
pricing:{baseRate:300},
rating:{average:4.0,count:12}
},

{
name:"Karan Kapoor",
email:"karanpaint@test.com",
phone:"9876500046",
password:"123456",
categories:["Painter"],
skills:[
{name:"Color Mixing",category:"Painter",experience:5}
],
pricing:{baseRate:340},
rating:{average:4.4,count:19}
},

/* CLEANERS */

{
name:"Ritu Sharma",
email:"ritu@test.com",
phone:"9876500051",
password:"123456",
categories:["Cleaner"],
skills:[
{name:"House Cleaning",category:"Cleaner",experience:4}
],
pricing:{baseRate:250},
rating:{average:4.2,count:14}
},

{
name:"Sanjana Verma",
email:"sanjana@test.com",
phone:"9876500052",
password:"123456",
categories:["Cleaner"],
skills:[
{name:"Deep Cleaning",category:"Cleaner",experience:5}
],
pricing:{baseRate:280},
rating:{average:4.4,count:18}
},

/* APPLIANCE REPAIR */

{
name:"Arif Khan",
email:"arif@test.com",
phone:"9876500061",
password:"123456",
categories:["Appliance Repair"],
skills:[
{name:"Washing Machine Repair",category:"Appliance Repair",experience:6}
],
pricing:{baseRate:450},
rating:{average:4.6,count:20}
},

{
name:"Sameer Shaikh",
email:"sameer@test.com",
phone:"9876500062",
password:"123456",
categories:["Appliance Repair"],
skills:[
{name:"Refrigerator Repair",category:"Appliance Repair",experience:5}
],
pricing:{baseRate:420},
rating:{average:4.4,count:17}
},

/* PEST CONTROL */

{
name:"Raj Malhotra",
email:"raj@test.com",
phone:"9876500071",
password:"123456",
categories:["Pest Control"],
skills:[
{name:"Termite Control",category:"Pest Control",experience:5}
],
pricing:{baseRate:500},
rating:{average:4.5,count:19}
},

{
name:"Vivek Sharma",
email:"vivek@test.com",
phone:"9876500072",
password:"123456",
categories:["Pest Control"],
skills:[
{name:"Cockroach Control",category:"Pest Control",experience:4}
],
pricing:{baseRate:470},
rating:{average:4.3,count:16}
}

];

const seedWorkers = async () => {
try{
await Worker.deleteMany();
await Worker.insertMany(workers);
console.log(`${workers.length} Workers inserted successfully`);
process.exit();
}catch(error){
console.log(error);
process.exit(1);
}
};

seedWorkers();