import messageSchema from '../models/message-schema.js';
import mongoose from 'mongoose';

const messageModel = mongoose.model('message');
// var messages = [{"id":4,"name":"Josh", "msgText":"Yes."},
//                 {"id":3,"name":"Scott", "msgText":"What are you, a neeeeeeerd?"},    
//                 {"id":2,"name":"Josh", "msgText":"It's a programming thing"},
//                 {"id":1,"name":"Scott", "msgText":"What?"},
//                 {"id":0,"name":"Josh", "msgText":"Hello World"}];

// GET Request Handler
const getAllMessages = async (req, res) => { 
  let messages = await messageModel.find( {}, '', { sort: { _id: -1 } }).exec();
  try{
    res.status(200).json(messages); 
  }
  catch(error){
    res 
        .status(400) 
        .send('Bad Request. The message in the body of the Request is either missing or malformed'); 
  }
}; 
   
// POST Request Handler
const addNewMessage = async (req, res) => { 
  try { 
    let message = await messageModel.create(req.body); 
    res.status(201).json(message); 
  } catch (err) { 
      res 
        .status(400) 
        .send('Bad Request. The message in the body of the Request is either missing or malformed.'); 
  }
}; 
   
const updateMessage = async (req, res) => {
  //res.status(200).send('Successful API Update Message PATCH Request');
  try {
    let message = await messageModel.findById(req.params.messageId).exec();
    if (!message) {
      // there wasn't an error, but the message wasn't found
      // i.e. the id given doesn't match any in the database
      res.sendStatus(404);
    } else {
      // message found - is the user authorized?
      if ( message.name === req.user.username ) {
        // auth user is owner of message, proceed w/ update
        message.msgText = req.body.msgText;
        await message.save();
        // send back 204 No Content
        res.sendStatus(204);
      } else {
        // auth user is not owner, unauthorized
        res.sendStatus(401);
      }
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
}
const deleteMessage = async (req, res) => {
  //res.status(200).send('Successful API Update Message PATCH Request');
  try {
    let message = await messageModel.findById(req.params.messageId).exec();
    if (!message) {
      // there wasn't an error, but the message wasn't found
      // i.e. the id given doesn't match any in the database
      res.sendStatus(404);
    } else {
      // message found - is the user authorized?
      if ( message.name === req.user.username ) {
        // auth user is owner of message, proceed w/ update
       
        await message.remove();
        // send back 204 No Content
        res.sendStatus(204);
      } else {
        // auth user is not owner, unauthorized
        res.sendStatus(401);
      }
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
}
 

export { getAllMessages, addNewMessage, updateMessage, deleteMessage};