import userModel from "../models/userModel.js"
import {hashPassword} from "../helpers/authHelper.js"

export const registerController = async (req, res) => {
    try {
        const {name, email, password, phone, address, role} = req.body
        // validations
        if (!name) {
            return res.send({error:'Name is required '})
        }
        if (!email) {
            return res.send({error:'Email is required '})
        }
        if (!password) {
            return res.send({error:'Password is required '})
        }
        if (!phone) {
            return res.send({error:'Phone number is required '})
        }
        if (!address) {
            return res.send({error:'Address is required '})
        }
        // Existing user
        const existingUser = await userModel.findOne({email:email})
        if (existingUser) {
            return res.status(200).send({
                success: true,
                message: "Already registered, please login"
            })
        }
        // register user
        const hashedPassword = await hashPassword(password)
        //save
        const user = await new userModel({name, email, password:hashedPassword, phone, address, role}).save()
        res.status(200).send({
            success: true,
            message: 'User registered successfully',
            user
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in registration',
            error
        })
    }
}