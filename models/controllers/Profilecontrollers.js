const profileData = require('../stdProfile')
const mongoose = require('mongoose')

const getprofileInfo = async(req,res)=>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({msg:"no such profile"})
    }
    const profileinfo = await profileData.findById(id)
    if(!profileinfo){
        return res.status(404).json({msg:"no such profile"})
    }
    res.status(200).json(profileinfo)
}

const createProfile = async(req,res)=> {
    const {fname,mname,admNo,ExamNo,rollNo,courseDetails,mail,bloodGrp,DOB}=req.body
    try{
        const profile = await profileData.create({fname,mname,admNo,ExamNo,rollNo,courseDetails,mail,bloodGrp,DOB})
        res.status(200).json(profile)
    }catch(error){
        res.status(400).json({msg:error.message})
    }

}
module.exports={
    createProfile,
    getprofileInfo
}