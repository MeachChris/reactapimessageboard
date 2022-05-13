import courseSchema from '../models/course-schema.js';
import mongoose from 'mongoose';

var labs = [
    { id: 0, labNo: 1, labTopic: 'ICS Review: A Message Board SPA' },
    { id: 1, labNo: 2, labTopic: 'Porting Your MB SPA to Next.js and Adding a Form' },
    { id: 2, labNo: 3, labTopic: 'Designing a RESTful API for the Message Board App' }
];


//Midterm labs GET handler
const getAllLabs = async (req,res)=>{
   try{
        res.status(200).json(labs);
    } catch (err){ 
        res 
          .status(400) 
          .send('Bad Request.'); 
    }
}

//if(typeof(labs) !== 'undefined') also works but try/catch is better


//Final Exam GET and POST handlers

const courseModel = mongoose.model('course');

const getAllCourses = async (req,res)=>{
    let courses = await courseModel.find( {}, '', { sort: { _id: -1 } }).exec();
    try{
        res.status(200).json(courses); 
     } catch (err){ 
         res 
           .status(400) 
           .send('Bad Request.'); 
     }
 }


const registerANewCourse = async (req,res)=>{
    try { 
        //If course code does not exist, this code will run, else Forbidden
        if(!await courseModel.exists({ code:req.body.code })){
          let courseResponse = await courseModel.create(req.body); 
          res.status(201).json(courseResponse); 
        }
        else{
          res.status(403).send("Forbidden. A course with that course already exists");
        }
      } catch (err) { 
          res 
            .status(400) 
            .send('Bad Request. The message in the body of the Request is either missing or malformed.'); 
      }
}

  export {getAllLabs, getAllCourses, registerANewCourse};