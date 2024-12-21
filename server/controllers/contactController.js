const Contact = require('../models/Contact');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');

// @desc    Get all contacts
// @route   GET /api/v1/contacts
// @access  Private
exports.getContacts = asyncHandler(async (req, res, next) => {
    const contacts = await Contact.find().sort('-createdAt');

    res.status(200).json({
        success: true,
        count: contacts.length,
        data: contacts
    });
});

// @desc    Get single contact
// @route   GET /api/v1/contacts/:id
// @access  Private
exports.getContact = asyncHandler(async (req, res, next) => {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
        return next(new ErrorResponse(`Contact not found with id of ${req.params.id}`, 404));
    }

    res.status(200).json({
        success: true,
        data: contact
    });
});

// @desc    Create new contact
// @route   POST /api/v1/contacts
// @access  Public
exports.createContact = asyncHandler(async (req, res, next) => {
    const contact = await Contact.create(req.body);

    res.status(201).json({
        success: true,
        data: contact
    });
});

// @desc    Update contact status
// @route   PUT /api/v1/contacts/:id
// @access  Private
exports.updateContact = asyncHandler(async (req, res, next) => {
    let contact = await Contact.findById(req.params.id);

    if (!contact) {
        return next(new ErrorResponse(`Contact not found with id of ${req.params.id}`, 404));
    }

    contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        success: true,
        data: contact
    });
});

// @desc    Delete contact
// @route   DELETE /api/v1/contacts/:id
// @access  Private
exports.deleteContact = asyncHandler(async (req, res, next) => {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
        return next(new ErrorResponse(`Contact not found with id of ${req.params.id}`, 404));
    }

    await contact.deleteOne();

    res.status(200).json({
        success: true,
        data: {}
    });
});
