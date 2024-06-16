const { Queue, QueueScheduler, Worker, Job } = require('bullmq');
const {extractTextFromPDF} = require('../bullMQ_service/text_extractor')
const {generateEmbedding} = require('../bullMQ_service/generate_embedding')
const {saveProject} = require('../dao/ProjectDao')



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
    const {projectName, description, pdfUrl, userId} = job.data;
    try {
      console.log("Job started: ", job.id)  

      const text = await extractTextFromPDF(pdfUrl);

      const embedding = await generateEmbedding(text);
  
      //first save project in db for userId
      //then save pdf_emb in db using this project_id
      await saveProject(projectName, description, pdfUrl, userId, embedding); 

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
