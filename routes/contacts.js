const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Contact = require('../models/contact');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
// @route 		GET api/contacts
// @desc 		get all users contacts
// @acess		Private
router.get('/',auth,async (req,res)=>{
	try{
		// console.log(req.user);
		const contacts = await Contact.find({user: req.user._id}).sort({date:-1});
		res.json(contacts);
		}
	catch(err){
		console.error(err.message);
		res.status(500).send('Server Error');
		}

});

// @route 		POST api/contacts
// @desc 		Add a new contacts
// @acess		Private
router.post('/',[auth,
	check('name','name is required').not().isEmpty()],
	async (req,res)=>{
	const errors = validationResult(req);
		if(!errors.isEmpty()){
			return res.status(400).json({errors:errors.array()});
		}
	const {name,email,phone,type} = req.body;

	try{
		const newcontact = new Contact({
			name,
			email,
			phone,
			type,
			user:req.user.id
		});
		const contact = await newcontact.save();
		res.json(contact);
	}
	catch(err){
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route 		PUT api/contacts/:id
// @desc 		Update contact
// @acess		Private
router.put('/:id',auth,async(req,res)=>{
	const {name,email,phone,type} = req.body;
	const contactFields ={};
	if(name) contactFields.name= name;
	if(email) contactFields.email = email;
	if(phone) contactFields.phone = phone;
	if(type) contactFields.type = type;
	try{
		let contact= await Contact.findById(req.params.id);

		if(!contact) return res.status(404).send({msg:'Contact not found'});
		
		if(contact.user.toString()!== req.user.id)return res.status(401).send({msg:'Not authorized'});

		contact = await Contact.findByIdAndUpdate(
			req.params.id,
			{$set: contactFields},
			{new: true}
			);
		res.json(contact);
	}		catch(err){
		console.error(err.message);
		res.status(500).send('Server Error');
	}

});

// @route 		Delete api/contacts/:id
// @desc 		Delete contacts
// @acess		Private
router.delete('/',async(req,res)=>{
	try{
		let contact = await Contact.findById(req.params.id);

		if(!contact) return res.status(404).json({msg:'Contact not found'});

		if(contact.user.toString()!== req.user.id)return res.status(401).send({msg:'Not authorized'});

		await Contact.findByIdAndRemove(req.params.id);

		res.json({msg:'Contact removed'});

	}
	catch(err){
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});
module.exports =  router;