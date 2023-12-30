const express = require('express');
const router = express.Router();
const {
  getAllCourses,
  createCourse,
  updateCourse,
  deleteCourse,
} = require('../controller/courses');
const upload = require('../uploadMiddleware');

// Define your routes
router.get('/courses', getAllCourses);
//router.get('/courses/:id', getCourseById);
router.post('/courses', upload.single('image'), createCourse); // Added image upload middleware for creating
router.put('/courses/:id', upload.single('image'), updateCourse); // Added image upload middleware for updating
router.delete('/courses/:id', deleteCourse);

module.exports = router;
