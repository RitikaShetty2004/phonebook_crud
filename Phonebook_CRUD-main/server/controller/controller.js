const Userdb = require('../model/model');

// 🔹 Create and Save New User
exports.create = (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: "Content can not be empty!" });
    }

    const user = new Userdb({
        name: req.body.name,
        email: req.body.email,
        number: req.body.number,
        gender: req.body.gender
    });

    user.save()
        .then(() => res.redirect('/add-user'))
        .catch(err =>
            res.status(500).send({
                message: err.message || "Error occurred while creating a user."
            })
        );
};

// 🔹 Retrieve All Users or Single User by ID
exports.find = (req, res) => {
    const id = req.query.id;

    if (id) {
        Userdb.findById(id)
            .then(data => {
                if (!data) return res.status(404).send({ message: "User not found with id " + id });
                res.send(data);
            })
            .catch(err =>
                res.status(500).send({ message: "Error retrieving user with id " + id })
            );
    } else {
        Userdb.find()
            .then(users => res.send(users))
            .catch(err =>
                res.status(500).send({
                    message: err.message || "Error retrieving user information"
                })
            );
    }
};

// 🔹 Update User by ID
exports.update = (req, res) => {
    if (!req.body) return res.status(400).send({ message: "Update data cannot be empty!" });

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false, new: true })
        .then(data => {
            if (!data) return res.status(404).send({ message: `User not found with id ${id}` });
            res.send(data);
        })
        .catch(err =>
            res.status(500).send({ message: "Error updating user with id " + id })
        );
};

// 🔹 Delete User by ID
exports.delete = (req, res) => {
    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
        .then(data => {
            if (!data) return res.status(404).send({ message: `User not found with id ${id}` });
            res.send({ message: "User was deleted successfully!" });
        })
        .catch(err =>
            res.status(500).send({ message: "Could not delete user with id " + id })
        );
};

// 🔍 Search Users by Name
exports.search = (req, res) => {
    const query = req.query.name;

    if (!query) {
        return res.status(400).send({ message: "Search query is required" });
    }

    Userdb.find({ name: { $regex: new RegExp(query, 'i') } })
        .then(users => {
            if (!users.length) {
                return res.status(404).send({ message: "No users found matching the query" });
            }
            res.send(users);
        })
        .catch(err =>
            res.status(500).send({
                message: "Error occurred while searching users",
                error: err.message
            })
        );
};

// 🔒 Login Controller
exports.login = (req, res) => {
    const { name, password } = req.body;

    const allowedName = 'admin';
    const allowedPassword = '123';

    if (name === allowedName && password === allowedPassword) {
        req.session.isLoggedIn = true;   // ✅ Set session
        req.session.username = name;
        return res.redirect('/');
    } else {
        return res.send(`<script>alert("Invalid credentials"); window.location.href="/login";</script>`);
    }
};

// 🔓 Logout Controller
exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log('Session Destroy Error:', err);
            return res.status(500).send("Unable to logout.");
        }
        res.redirect('/login'); // After logout, go to login
    });
};
