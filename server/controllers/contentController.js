const Content = require('../models/Content');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');

// @desc    Get all content
// @route   GET /api/v1/content
// @access  Public
exports.getAllContent = asyncHandler(async (req, res, next) => {
    const content = await Content.find({ status: 'published' }).populate('author', 'username');

    res.status(200).json({
        success: true,
        count: content.length,
        data: content
    });
});

// @desc    Get all content (including drafts)
// @route   GET /api/v1/content/all
// @access  Private
exports.getAdminContent = asyncHandler(async (req, res, next) => {
    const content = await Content.find().populate('author', 'username');

    res.status(200).json({
        success: true,
        count: content.length,
        data: content
    });
});

// @desc    Get single content
// @route   GET /api/v1/content/:id
// @access  Public
exports.getContent = asyncHandler(async (req, res, next) => {
    const content = await Content.findById(req.params.id).populate('author', 'username');

    if (!content) {
        return next(new ErrorResponse(`Content not found with id of ${req.params.id}`, 404));
    }

    res.status(200).json({
        success: true,
        data: content
    });
});

// @desc    Create new content
// @route   POST /api/v1/content
// @access  Private
exports.createContent = asyncHandler(async (req, res, next) => {
    // Add author to req.body
    req.body.author = req.admin.id;

    const content = await Content.create(req.body);

    res.status(201).json({
        success: true,
        data: content
    });
});

// @desc    Update content
// @route   PUT /api/v1/content/:id
// @access  Private
exports.updateContent = asyncHandler(async (req, res, next) => {
    let content = await Content.findById(req.params.id);

    if (!content) {
        return next(new ErrorResponse(`Content not found with id of ${req.params.id}`, 404));
    }

    // Make sure user is content author
    if (content.author.toString() !== req.admin.id && req.admin.role !== 'super-admin') {
        return next(new ErrorResponse(`Not authorized to update this content`, 401));
    }

    content = await Content.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        success: true,
        data: content
    });
});

// @desc    Delete content
// @route   DELETE /api/v1/content/:id
// @access  Private
exports.deleteContent = asyncHandler(async (req, res, next) => {
    const content = await Content.findById(req.params.id);

    if (!content) {
        return next(new ErrorResponse(`Content not found with id of ${req.params.id}`, 404));
    }

    // Make sure user is content author
    if (content.author.toString() !== req.admin.id && req.admin.role !== 'super-admin') {
        return next(new ErrorResponse(`Not authorized to delete this content`, 401));
    }

    await content.deleteOne();

    res.status(200).json({
        success: true,
        data: {}
    });
});
