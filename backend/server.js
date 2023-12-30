const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const controller = require('./controller/courses');
const path = require('path');
const routes = require('./croutes/routes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

// Serve static files from the 'assets' folder
app.use('/assets', express.static('assets'));
/*
app.get('/courses', (req, res) => {
    const courses = [
        { id: 1, title: 'Spring Boot / Angular' , image: 'http://localhost:5000/assets/springAngular.jpg',price:'350 DT/Month' },
        { id: 2, title: 'NodeJS / React' , image: 'http://localhost:5000/assets/reactnode.jpg',price:'350 DT/Month'},
        { id: 3, title: 'Business Intelligence' , image: 'http://localhost:5000/assets/Busnes.jpeg',price:'350 DT/Month'},
        { id: 4, title: 'Artificial Intelligence', image: 'http://localhost:5000/assets/ia.jpg',price:'350 DT/Month' },
        { id: 5, title: 'Flutter / Firebase', image: 'http://localhost:5000/assets/flutterfirebase.jpg' ,price:'350 DT/Month'},
        { id: 6, title: 'Devops', image: 'http://localhost:5000/assets/DevOps.jpg',price:'350 DT/Month' },
    ];
    res.json(courses);
});

app.post('/register', (req, res) => {
    console.log(req.body);
    res.sendStatus(200);
});*/
// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/coursesDB', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});

// Multer setup for image upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './backend/assets'); 
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    },
  });
  
  const upload = multer({ storage });
  

// CRUD routes
/*app.get('/admin/courses', controller.getAllCourses);
app.post('/admin/courses', upload.single('image'), controller.createCourse); // Added image upload middleware
app.put('/admin/courses/:id', controller.updateCourse);
app.delete('/admin/courses/:id', controller.deleteCourse);*/
app.use('/', routes);

// Serve React build in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'frontend/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
  });
}


//const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

///////////////////////////////////////////////////////////////////////
