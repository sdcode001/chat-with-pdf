const use = require('@tensorflow-models/universal-sentence-encoder');
const tf = require('@tensorflow/tfjs');


async function generateEmbedding(text){
    // Set the backend to 'cpu'
    await tf.setBackend('cpu');
    await tf.ready(); // Ensure the backend is ready

    //loads the Universal Sentence Encoder model and generates vector embeddings from the extracted text.
    const model = await use.load(); 
    const embedding = await model.embed([text]);
    return embedding.arraySync()[0];
}

module.exports = {
    generateEmbedding
}

