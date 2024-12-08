// routes/ticketRoutes.js
const express = require('express');
const router = express.Router();
const { createTicket, updateTicketStatus, getAllTickets } = require('../controllers/ticketController');

// Create a new ticket
router.post('/create', createTicket);

// Update ticket status (open, in-progress, closed)
router.put('/update/:ticketId', updateTicketStatus);

// Get all tickets (admin route)
router.get('/', getAllTickets);

module.exports = router;
