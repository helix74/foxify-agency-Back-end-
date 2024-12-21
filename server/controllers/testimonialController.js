const Testimonial = require('../models/Testimonial');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');

// @desc    Get all testimonials
// @route   GET /api/v1/testimonials
// @access  Public
exports.getTestimonials = asyncHandler(async (req, res, next) => {
    const testimonials = await Testimonial.find({ isApproved: true });

    res.status(200).json({
        success: true,
        count: testimonials.length,
        data: testimonials
    });
});

// @desc    Get all testimonials (including unapproved)
// @route   GET /api/v1/testimonials/all
// @access  Private
exports.getAllTestimonials = asyncHandler(async (req, res, next) => {
    const testimonials = await Testimonial.find();

    res.status(200).json({
        success: true,
        count: testimonials.length,
        data: testimonials
    });
});

// @desc    Get single testimonial
// @route   GET /api/v1/testimonials/:id
// @access  Public
exports.getTestimonial = asyncHandler(async (req, res, next) => {
    const testimonial = await Testimonial.findById(req.params.id);

    if (!testimonial) {
        return next(new ErrorResponse(`Testimonial not found with id of ${req.params.id}`, 404));
    }

    res.status(200).json({
        success: true,
        data: testimonial
    });
});

// @desc    Create new testimonial
// @route   POST /api/v1/testimonials
// @access  Public
exports.createTestimonial = asyncHandler(async (req, res, next) => {
    const testimonial = await Testimonial.create(req.body);

    res.status(201).json({
        success: true,
        data: testimonial
    });
});

// @desc    Update testimonial
// @route   PUT /api/v1/testimonials/:id
// @access  Private
exports.updateTestimonial = asyncHandler(async (req, res, next) => {
    let testimonial = await Testimonial.findById(req.params.id);

    if (!testimonial) {
        return next(new ErrorResponse(`Testimonial not found with id of ${req.params.id}`, 404));
    }

    testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        success: true,
        data: testimonial
    });
});

// @desc    Delete testimonial
// @route   DELETE /api/v1/testimonials/:id
// @access  Private
exports.deleteTestimonial = asyncHandler(async (req, res, next) => {
    const testimonial = await Testimonial.findById(req.params.id);

    if (!testimonial) {
        return next(new ErrorResponse(`Testimonial not found with id of ${req.params.id}`, 404));
    }

    await testimonial.deleteOne();

    res.status(200).json({
        success: true,
        data: {}
    });
});
