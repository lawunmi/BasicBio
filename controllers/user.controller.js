import userModel from '../models/user.model.js';
import bcrypt from 'bcryptjs';

const createUser = async (req, res) =>{

    const {email, password, ...others} = req.body;

        // Check if a value is provided for email or password
        if(!email || !password)
        {
            return res.status(400).json({status:"fail", message:"Provide a valid email or password"});
        }

        // Check for an existing user
        const isUser = await userModel.findOne({email});
        if(isUser)
        {
            return res.status(409).json({status:"fail", message:"A user with this email already exist"})
        }

    try{
        // Password hashing
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const newUser = new userModel({email, password:hashedPassword, ...others});
        const savedUser = await newUser.save();
        return res.status(201).json({status: "success", message:"User created successfully", result:savedUser});

    }catch(error){
        return res.status(500).json({status:"fail", message:error.message})
    }
};

const loginUser = async(req, res) => {
    const {email, password} = req.body;
        // Confirm if a user exist
        const user = await userModel.findOne({email});
        //console.log(user);
        if(!user)
        {
            return res.status(400).json({status:"fail", message:"This user does not exist, create an account"});
        }

        // Password validation
        const isValid = bcrypt.compareSync(password, user.password);
        if(!isValid)
        {
            return res.status(401).json({status:"fail", message:"Invalid password"});
        }
    try{
        return res.status(200).json({status:"fail", message:"Login successful", result:[{id:user.id, name:user.name, email:user.email}]});
    }catch(error){
        return res.status(500).json({status:"fail", message:error.message})
    }
}

const getUsers = async (req, res) =>{
    try{
        const allUsers = await userModel.find();
        return res.status(200).json({status: "success", message:"Users ", result:allUsers});
    }catch(error){
        return res.status(500).json({status:"fail", message:error.message})
    }
    
}

const updateUser = async (req, res) =>{
    try{
        const {id} = req.params;
        const payload = req.body;
        const updatedUser = await userModel.findByIdAndUpdate(id, {...payload}, {new:true});
        return res.status(200).json({status: "success", message:"User record updated successfully ", result:updatedUser});
    }catch(error){
        return res.status(500).json({status:"fail", message:error.message})
    }
    
}

const deleteUser = async (req, res) =>{
    try{
        const {id} = req.params;
        const deletedUser = await userModel.findByIdAndDelete(id);
        return res.status(200).json({status: "success", message:"User record deleted ", result:deletedUser});
    }catch(error){
        return res.status(500).json({status:"fail", message:error.message})      
    }
}


export {createUser, loginUser, getUsers, updateUser, deleteUser}