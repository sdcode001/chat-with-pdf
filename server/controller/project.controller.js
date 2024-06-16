const {pdfQueue} = require('../bullMQ_service/bullmq_worker')


async function ProjectCreateHandler(req, res){
    console.log(req.body)

    const user_id = 1001;

    const job = await pdfQueue.add(
        `processPdf-${req.body.projectName}`, 
        {projectName: req.body.projectName, 
         description: req.body.description,
         pdfUrl: req.body.pdfUrl,
         userId: user_id 
        }
    )

    let startTime = Date.now();
    while(Date.now() - startTime < 45000){ //wait for 45 seconds
        const status = await job.getState();
        if(status == 'completed'){
           return res.status(200).json({message: 'Project created'})
        }
        else if(status == 'failed'){
           return res.status(200).json({message: 'Failed to create project'})
        }
    }

    return res.status(200).json({message: 'Failed to create project'})
}



module.exports = {
    ProjectCreateHandler
}