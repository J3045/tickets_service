const Queue = require('bull');
const redis = require('../config/redis');

const ticketQueue = new Queue('ticketQueue', { redis });

ticketQueue.process(async (job) => {
  console.log(`Processing job: ${job.id}`);
  // Simulate work
  await new Promise((resolve) => setTimeout(resolve, job.data.duration));
  console.log(`Completed job: ${job.id}`);
});

module.exports = ticketQueue;
