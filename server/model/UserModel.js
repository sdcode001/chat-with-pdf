const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')

//this is the user schema.
const userSchema=mongoose.Schema(
    {
        fname:{type:String,required:true},
        lname:{type:String,required:true},
        email:{type:String,required:true,unique:true},
        password:{type:String,required:true},
    },{
        timestamps:true
    }
)

//encrypting the password before saving to database
userSchema.pre("save",async function (next){
    if(!this.isModified){
     next()
    }
     const salt=await bcrypt.genSalt(10)
     this.password=await bcrypt.hash(this.password,salt)
 })


const User=mongoose.models.User || mongoose.model("User",userSchema)

module.exports = {
    User
}

