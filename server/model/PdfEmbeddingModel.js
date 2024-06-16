const mongoose=require('mongoose')

const pdfEmbeddingSchema = mongoose.Schema(
    {
       embedding: [Number],
       projectId: {type:String,required:true}
    },
    {
        timestamps:true
    }
)


const PdfEmbedding = mongoose.models.PdfEmbedding || mongoose.model("PdfEmbedding", pdfEmbeddingSchema)

module.exports = {
    PdfEmbedding
}

