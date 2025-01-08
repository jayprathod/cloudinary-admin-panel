const User = require("../model/user.Schema");
const bcrypt = require("bcrypt");
const cloudinary = require('cloudinary').v2;

async function userRegister(req, res) {
    try{
        const {name, surname, email, birthDate, password} = req.body;
        const file = req.files;

        const buff = new Buffer(file[0].buffer);
        const base64data = buff.toString("base64");
        const imageUrl = await cloudinary.uploader.upload(
        `data:${file[0].mimetype};base64,${base64data}`
        );

        const bcryptPassword = await bcrypt.hash(password, 12);
        await User.create({
            name, 
            surname,
            email,
            birthDate,
            password : bcryptPassword,
            profileImage: imageUrl.secure_url,
            publicId: imageUrl.public_id,
        });

        return res.status(200).send({message: "Registretion Succesfull"});
    }
    catch(err){
        return res.status(500).send({message: err});
    }
}

async function userList(req, res) {
    try{
        const userList = await User.find({})
            .select("name surname email birthDate profileImage");

        return res.status(200).send({message: userList});
    }
    catch(err){
        return res.status(500).send({message: err});
    }
}

async function userDelete(req, res) {
    try{
        const userId = req.params.userId;

        const userExist = await User.findById({_id: userId});
        if(!userExist){
            return res.status(401).send({message: "Invalid User"});
        }

        const userList = await User.findByIdAndDelete({_id: userId});
        const result = await cloudinary.uploader.destroy(userList.publicId);
        if (result.result !== "ok") {
            return res.status(400).send({ message: "Failed to delete the image" });
        }
        return res.status(200).send({message: userList});
    }
    catch(err){
        return res.status(500).send({message: err});
    }
}


module.exports = {
    userRegister,
    userList,
    userDelete,
}