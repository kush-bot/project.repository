const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema

const userSchema  = new Schema({
    username:{
        type:String,
        required:true,

    },
    password:{
        type:String,
        required:true,
    }
})

userSchema.statics.signup = async function(username, password){
    const exists = await this.findOne({ username })

    if(exists){
        throw Error('user already exists')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({username,password: hash })

    return user

}



module.exports = mongoose.model('User',userSchema )