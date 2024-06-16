const {PdfEmbedding} = require('../model/PdfEmbeddingModel')


async function savePdfEmbedding(embedding, projectId){
   try{
      await PdfEmbedding.create({embedding, projectId})
      .then((data) => {
         console.log('embedding saved for project: ', projectId)
         return data
      })
      .catch(err=>{
         throw err;
      })
   }catch(err){
     throw err;
   }
}


module.exports = {
    savePdfEmbedding
}