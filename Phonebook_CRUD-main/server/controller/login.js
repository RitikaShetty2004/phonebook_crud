exports.login = (req, res) => {
    const { username, password } = req.body;

    const MY_USERNAME = "admin";
    const MY_PASSWORD = "123"; // use a strong password

    if (username === MY_USERNAME && password === MY_PASSWORD) {
        // Logged in successfully
        return res.send("Login successful!");
    } else {
        return res.status(401).send("Invalid credentials");
    }
};
