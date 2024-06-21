const {Project} = require('../model/ProjectModel')
const {savePdfEmbedding} = require('./PdfEmbeddingDao')

async function saveProject(projectName, description, pdfUrl, userId, embedding){
      try{
          await Project.create({projectName, description, pdfUrl, userId})
          .then(async (data)=>{
              await savePdfEmbedding(embedding, data._id.toString());
          })
          .catch(err=>{
              throw err;
          }) 
      }catch(err){
        throw err;
      }
}


module.exports = {
    saveProject
}