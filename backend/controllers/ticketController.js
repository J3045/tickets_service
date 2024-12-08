// controllers/ticketController.js
const Ticket = require('../models/Ticket');

// Create a new ticket
exports.createTicket = async (req, res) => {
    try {
        const { userId, issueDescription, priority } = req.body;

        const newTicket = new Ticket({
            userId,
            issueDescription,
            priority
        });

        await newTicket.save();
        res.status(201).json({ message: 'Ticket created successfully', ticket: newTicket });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Update ticket status (open, in-progress, closed)
exports.updateTicketStatus = async (req, res) => {
    try {
        const { ticketId } = req.params;
        const { status } = req.body;

        // Find the ticket and update status
        const ticket = await Ticket.findById(ticketId);
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        ticket.status = status;
        await ticket.save();

        res.json({ message: 'Ticket status updated', ticket });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get all tickets (admin route)
exports.getAllTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find();
        res.json(tickets);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
