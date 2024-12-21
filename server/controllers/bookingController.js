const Booking = require('../models/Booking');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');

// @desc    Get all bookings
// @route   GET /api/v1/bookings
// @access  Private
exports.getBookings = asyncHandler(async (req, res, next) => {
    const bookings = await Booking.find().populate('serviceRequested');
    
    res.status(200).json({
        success: true,
        count: bookings.length,
        data: bookings
    });
});

// @desc    Get single booking
// @route   GET /api/v1/bookings/:id
// @access  Private
exports.getBooking = asyncHandler(async (req, res, next) => {
    const booking = await Booking.findById(req.params.id).populate('serviceRequested');

    if (!booking) {
        return next(new ErrorResponse(`Booking not found with id of ${req.params.id}`, 404));
    }

    res.status(200).json({
        success: true,
        data: booking
    });
});

// @desc    Create new booking
// @route   POST /api/v1/bookings
// @access  Public
exports.createBooking = asyncHandler(async (req, res, next) => {
    const booking = await Booking.create(req.body);

    res.status(201).json({
        success: true,
        data: booking
    });
});

// @desc    Update booking
// @route   PUT /api/v1/bookings/:id
// @access  Private
exports.updateBooking = asyncHandler(async (req, res, next) => {
    let booking = await Booking.findById(req.params.id);

    if (!booking) {
        return next(new ErrorResponse(`Booking not found with id of ${req.params.id}`, 404));
    }

    booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        success: true,
        data: booking
    });
});

// @desc    Delete booking
// @route   DELETE /api/v1/bookings/:id
// @access  Private
exports.deleteBooking = asyncHandler(async (req, res, next) => {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
        return next(new ErrorResponse(`Booking not found with id of ${req.params.id}`, 404));
    }

    await booking.deleteOne();

    res.status(200).json({
        success: true,
        data: {}
    });
});
