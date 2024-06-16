const { Queue, QueueScheduler, Worker, Job } = require('bullmq');
const {extractTextFromPDF} = require('../bullMQ_service/text_extractor')
const {generateEmbedding} = require('../bullMQ_service/generate_embedding')


//Create a BullMQ queue
const pdfQueue = new Queue('pdfQueue', {
    //Redis server connection
    connection: {
      host: 'localhost',
      port: 6379,
    },
});


//Create a queue scheduler to manage jobs
new QueueScheduler('pdfQueue', {
    //Redis server connection
    connection: {
      host: 'localhost',
      port: 6379,
    },
});


// Create a worker to process jobs
const worker = new Worker('pdfQueue', async job => {
    const {projectName, description, pdfUrl} = job.data;
    try {
      console.log("Job started: ", job.id)  

      const text = await extractTextFromPDF(pdfUrl);

      const embedding = await generateEmbedding(text);
  
      // Here, you can save the embedding to a database or file
      
      

    } catch (err) {
      console.log(err)
    }
  },
  {concurrency: 30}
);
  

  worker.on('completed',async (job) => {
    console.log(`Job ${job.id} completed!`);
  });
  

  worker.on('failed',async (job, err) => {
    console.error(`Job ${job.id} failed:`, err);
  });

  

module.exports = {
    pdfQueue
}
