const express = require('express');
const route = express.Router();

// Import services and controller
const services = require('../services/render');
const controller = require('../controller/controller');

// ✅ View Routes (Rendering EJS Pages)
route.get('/', services.homeRoutes);
route.get('/add-user', services.add_user);
route.get('/update-user', services.update_user);

// ✅ Authentication Pages
route.get('/login', (req, res) => {
    res.render('login');
});

route.get('/register', (req, res) => {
    res.render('register');
});

route.get('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy((err) => {
            if (err) {
                console.log('Error destroying session:', err);
                res.status(500).send('Failed to log out.');
            } else {
                res.redirect('/logout-page'); // ✅ Logout page after session destroyed
            }
        });
    } else {
        res.redirect('/logout-page');
    }
});

// ✅ Logout page view
route.get('/logout-page', (req, res) => {
    res.render('logout'); // <-- logout.ejs should exist in your 'views' folder
});

// ✅ Authentication API
route.post('/login', controller.login); 

// (Optional) Register API
if (controller.register) {
    route.post('/register', controller.register);
}

// ✅ User CRUD API Routes
route.post('/api/users', controller.create);
route.get('/api/users', controller.find);
route.put('/api/users/:id', controller.update);
route.delete('/api/users/:id', controller.delete);

// 🔍 Search API (optional)
if (controller.search) {
    route.get('/api/users/search', controller.search);
}

// ✅ Export the router
module.exports = route;
