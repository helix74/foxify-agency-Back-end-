const Service = require('../models/Service');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');

// @desc    Get all services
// @route   GET /api/v1/services
// @access  Public
exports.getServices = asyncHandler(async (req, res, next) => {
    const services = await Service.find();

    res.status(200).json({
        success: true,
        count: services.length,
        data: services
    });
});

// @desc    Get single service
// @route   GET /api/v1/services/:id
// @access  Public
exports.getService = asyncHandler(async (req, res, next) => {
    const service = await Service.findById(req.params.id);

    if (!service) {
        return next(new ErrorResponse(`Service not found with id of ${req.params.id}`, 404));
    }

    res.status(200).json({
        success: true,
        data: service
    });
});

// @desc    Create new service
// @route   POST /api/v1/services
// @access  Private
exports.createService = asyncHandler(async (req, res, next) => {
    const service = await Service.create(req.body);

    res.status(201).json({
        success: true,
        data: service
    });
});

// @desc    Update service
// @route   PUT /api/v1/services/:id
// @access  Private
exports.updateService = asyncHandler(async (req, res, next) => {
    let service = await Service.findById(req.params.id);

    if (!service) {
        return next(new ErrorResponse(`Service not found with id of ${req.params.id}`, 404));
    }

    service = await Service.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        success: true,
        data: service
    });
});

// @desc    Delete service
// @route   DELETE /api/v1/services/:id
// @access  Private
exports.deleteService = asyncHandler(async (req, res, next) => {
    const service = await Service.findById(req.params.id);

    if (!service) {
        return next(new ErrorResponse(`Service not found with id of ${req.params.id}`, 404));
    }

    await service.deleteOne();

    res.status(200).json({
        success: true,
        data: {}
    });
});
