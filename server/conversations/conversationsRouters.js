const express = require('express');
const firebase = require('../firebase/firebase.js');
const rootRef = firebase.database().ref();
const router = express.Router();


//--------------------------------------------------------POSTS

router.post(
  '/addMessage',
  (req, res) => {

    const messageKey = rootRef.push(null).key;

    // Deconstruct Request Body
    const {
      uid, // User ID
      pid, // Participant ID
      message,
      name,
      participant,
      date
    } = req.body;

    cid = [uid, pid].sort().join('');

    // Check for Missing Required Information
    if (!pid || !uid || !message || !name || !participant || !date) {
     return res.status(400).json({"errorMessage":"Please send a message, date, and the names and ids of both participants."})
    }

    // Construct New Message Object
    let newMessage = {
      date,
      message,
      name,
    }

    // Construct Object to Add to User's Conversation Lookup
    let newUserLookup = {
      lastMessage: newMessage,
      participant: {
        name: participant,
        uid: pid
      }
    }

    // Construct Object to Add to Participant's Conversation Lookup
    let newParticipantLookup = {
      lastMessage: newMessage,
      participant: {
        name,
        uid
      }
    }
    
    // Create Object to Update Firebase
    let updateObject = {};

    // Set Up New Message to be Added to Conversations and Conversation Lookup
    updateObject[`conversations/${cid}/${messageKey}`] = newMessage;
    updateObject[`conversationLookup/${uid}/${cid}`] = newUserLookup;
    updateObject[`conversationLookup/${pid}/${cid}`] = newParticipantLookup;
    

    // Update database with the new object
    rootRef.update(updateObject).catch(error => console.log(error));

    // Success Message
    res.status(201).json({
      success: `Message has been sent.`,
    });
  }
);

module.exports = router;