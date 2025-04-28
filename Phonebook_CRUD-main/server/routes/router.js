const express = require('express');
const route = express.Router();

// Import services and controller
const services = require('../services/render');
const controller = require('../controller/controller');

// ✅ GET Routes for Rendering Views
if (services.homeRoutes) route.get('/', services.homeRoutes);
else console.error("❌ services.homeRoutes is not defined!");

if (services.add_user) route.get('/add-user', services.add_user);
else console.error("❌ services.add_user is not defined!");

if (services.update_user) route.get('/update-user', services.update_user);
else console.error("❌ services.update_user is not defined!");

// ✅ Login & Register Pages
route.get('/login', (req, res) => {
    res.render('login');
});

route.get('/register', (req, res) => {
    res.render('register');
});

// ✅ Login form submission
route.post('/login', controller.login);  // <-- FIXED here from `router` to `route`

// ✅ REST API Routes
route.post('/api/users', controller.create);
route.get('/api/users', controller.find);
route.put('/api/users/:id', controller.update);
route.delete('/api/users/:id', controller.delete);

// 🔍 Optional Search API
if (controller.search) {
    route.get('/api/users/search', controller.search);
}

// ✅ Export at the end
module.exports = route;
