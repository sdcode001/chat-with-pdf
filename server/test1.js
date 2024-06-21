const { Pinecone } = require("@pinecone-database/pinecone");
const { Document } = require("@langchain/core/documents");
const { OpenAIEmbeddings, OpenAI} = require("@langchain/openai");
const {VectorDBQAChain} = require('langchain/chains')
const { PineconeStore } = require("@langchain/pinecone");
require('dotenv').config({path:'./.env'})


async function main(){
    // Instantiate a new Pinecone client, which will automatically read the
    // env vars: PINECONE_API_KEY and PINECONE_ENVIRONMENT which come from
    const pinecone = new Pinecone();

    const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX);
    
    const vectorStore = await PineconeStore.fromExistingIndex(
      new OpenAIEmbeddings(),
      { pineconeIndex }
    );

    const docs = [
      new Document({
        metadata: { foo: "bar" },
        pageContent: "pinecone is a vector db",
      }),
      new Document({
        metadata: { foo: "bar" },
        pageContent: "the quick brown fox jumped over the lazy dog",
      }),
      new Document({
        metadata: { baz: "qux" },
        pageContent: "lorem ipsum dolor sit amet",
      }),
      new Document({
        metadata: { baz: "qux" },
        pageContent: "pinecones are the woody fruiting body and of a pine tree",
      }),
    ];

    await PineconeStore.fromDocuments(docs, new OpenAIEmbeddings(), {
      pineconeIndex,
      maxConcurrency: 5, // Maximum number of batch requests to allow at once. Each batch is 1000 vectors.
    });


    /* Search the vector DB independently with metadata filters */
    const results = await vectorStore.similaritySearch("pinecone", 1, {
      foo: "bar",
    });
    console.log(results);
    /*
      [
        Document {
          pageContent: 'pinecone is a vector db',
          metadata: { foo: 'bar' }
        }
      ]
    */


    /* Use as part of a chain (currently no metadata filters) */
    const model = new OpenAI();
    const chain = VectorDBQAChain.fromLLM(model, vectorStore, {k: 1, returnSourceDocuments: true,});
    const response = await chain.call({ query: "What is pinecone?" }); console.log(response);
    /*
    {
      text: A pinecone is the woody fruiting body of a pine tree.', 1
      sourceDocuments: '[
      Document {
      pageContent: 'pinecones are the woody fruiting body and of a pine tree', metadata: [Object]
      }
    }  
    */
    

} 


main();

