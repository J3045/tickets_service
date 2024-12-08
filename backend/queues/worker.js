const ticketQueue = require('./ticketQueue');

ticketQueue.on('completed', (job) => {
  console.log(`Job ${job.id} completed`);
});

ticketQueue.on('failed', (job, err) => {
  console.error(`Job ${job.id} failed with error: ${err.message}`);
});
