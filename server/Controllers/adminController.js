const Admin = require('../Models/AdminModel');


const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the admin with the given email
    const admin = await Admin.findOne({ email });

    // Check if the admin exists
    if (!admin) {
      return res.json({ success: false, message: 'Incorrect email or password' });
    }

    // Check if the password matches
    if (admin.password !== password) {
      return res.json({ success: false, message: 'Incorrect email or password' });
    }

    // Send success response
    res.status(200).json({ success: true, message: 'Admin logged in successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

module.exports = { adminLogin };
