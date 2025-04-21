import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModels.js";

const registerUser = async (req, res) => {
    const { name, email, password, phoneNum } = req.body;

    try {
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.json({ success: false, message: "Duplicate User" });
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }

        if (!validator.isAlpha(name, 'en-US', { ignore: ' ' })) {
            return res.json({ success: false, message: "Please enter a valid name" });
        }

        if (!validator.isMobilePhone(phoneNum, 'en-IN')) {
            return res.json({ success: false, message: "Please enter a valid 10-digit phone number" });
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password (at least 8 characters)" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
            phoneNum,
        });

        await newUser.save();
        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error registering user" });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User Not Found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid Credentials" });
        }

        res.json({ success: true, user });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error logging in" });
    }
};

const updateUser = async (req, res) => {
    const { email, name, phoneNum ,password} = req.body;

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User Not Found" });
        }

        if (!validator.isAlpha(name, 'en-US', { ignore: ' ' })) {
            return res.json({ success: false, message: "Please enter a valid name" });
        }

        if (!validator.isMobilePhone(phoneNum, 'en-IN')) {
            return res.json({ success: false, message: "Please enter a valid 10-digit phone number" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid Credentials" });
        }
        const updatedUser = await userModel.findOneAndUpdate(
            { email },
            { $set: { name, phoneNum } },
            { new: true, runValidators: true }
        );

        res.json({ success: true, user: updatedUser });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error updating user" });
    }
};

const deleteUser = async (req, res) => {
    const { email ,password} = req.body;

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User Not Found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid Credentials" });
        }
        const deletedUser = await userModel.findOneAndDelete({ email });
        res.json({ success: true, message: "User deleted successfully" });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error deleting user" });
    }
};

const findAll = async (req, res) => {
    try {
        const users = await userModel.find();
        res.json({ success: true, users });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error fetching users" });
    }
};

export { registerUser, loginUser, deleteUser, updateUser, findAll };
