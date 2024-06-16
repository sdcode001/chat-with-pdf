const pdf = require('pdf-parse');
const axios = require('axios');


async function extractTextFromPDF(pdf_url){
    try{ 
        const result = await axios.get(pdf_url, {
            responseType: 'arraybuffer'
        }); 

        const dataBuffer = Buffer.from(result.data)
        const data = await pdf(dataBuffer)
        return data.text;
    }
    catch(err){
        console.log(err)
        throw err;
    }
    
}

module.exports = {
    extractTextFromPDF
}