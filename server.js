require('dotenv').config(); 
const bcrypt = require('bcryptjs');
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const session = require('express-session');
const Admin = require('./models/Admin');
const ProjectModel = require('./models/Project');

const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const PORT = process.env.PORT || 3000;
const app = express();

connectDB();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

function isLoggedIn(req, res, next) {
    try {
        if (!req.cookies.token) {
            return res.redirect('/login');
        }

        const data = jwt.verify(req.cookies.token,
        process.env.JWT_SECRET
        );
        req.user = data;
        next();
    } catch (err) {
        return res.redirect('/login');
    }
}

// home page
app.get('/',(req, res) => {
    res.render('home');
});

// about page
app.get('/about',(req, res) => {
    res.render('about');
});

// skills page
app.get('/skills',(req, res) => {
    res.render('skills');
});

// projects page
app.get('/projects', async (req, res) => {
    try {
        const projects = await ProjectModel.find().sort({ createdAt: -1 });
        res.render('projects', { projects }); // <-- yaha pass karna zaruri hai
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// upload projec is created and save
app.post('/upload', async (req, res) => {
    try {
        const { YouTubeUrl, title, description, embedUrl } = req.body;

        if (!YouTubeUrl || !title || !description || !embedUrl) {
            return res.status(400).send('All fields are required');
        }

        const videoType = YouTubeUrl.includes('/shorts/') ? 'shorts' : 'normal';

        const newProject = new ProjectModel({
            title,
            description,
            youtubeUrl: YouTubeUrl,
            embedUrl,
            videoType
        });

        await newProject.save();
        res.redirect('/projects'); 
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// services page
app.get('/services',(req, res) => {
    res.render('services');
});

// contact page
app.get('/contact',(req, res) => {
    res.render('contact');
});

// log'in page
app.get('/login',(req, res) => {
    res.render('login');
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await Admin.findOne({ email });
        if (!user) return res.redirect('/wrong');

        const result = await bcrypt.compare(password, user.password);
        if (!result) return res.redirect('/wrong');

        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
        res.cookie("token", token, {
          httpOnly: true,
          secure: false,
          sameSite: "lax"
        });
        res.redirect("/upload");

    } catch (error) {
        console.log(error);
       res.send(error.message);
console.log(process.env.JWT_SECRET);
    }
});

app.get('/logout', (req, res) => {
    res.clearCookie("token");
    res.redirect('/');
});

// upload project page
app.get('/upload', isLoggedIn, (req, res) => {
    res.render('upload');
});

app.get('/err',(req, res) => {
    res.render('err');
});

app.get('/wrong',(req, res) => {
    res.render('wrong');
});

app.listen(PORT, () => {
    console.log('Server running on http://localhost:${PORT}');
});
