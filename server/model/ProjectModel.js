const mongoose=require('mongoose')

const projectSchema = mongoose.Schema(
    {
        projectName:{type:String,required:true},
        description:{type:String,required:true},
        pdfUrl:{type:String,required:true},
        userId:{type:String,required:true},
    },{
        timestamps:true
    }
)


const Project = mongoose.models.Project || mongoose.model("Project", projectSchema)

module.exports = {
    Project
}

