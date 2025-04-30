const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const materialRoutes = require("./routes/materialRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const cloudinaryRoutes = require("./routes/cloudinaryRoutes");
const cartRoutes = require('./routes/Addcart'); // Adjusted path
const orderRoutes = require('./routes/orderRoutes');
const emailRoutes = require('./routes/emailRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const feedbackRouter = require('./routes/feedbackRouter'); // Adjust the path as necessary
const votesRout= require('./routes/votes');
const { notFound, errorhandler } = require("./middlewares/errorMiddleware");
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
connectDB();

const cors = require('cors');
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));

// Define routes
app.use("/api/users", userRoutes);
app.use("/api/materials", materialRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api", cartRoutes); // Adjusted path
app.use("/api/cloudinary", cloudinaryRoutes);
app.use("/api", orderRoutes); // Adjusted path
app.use('/api/emails', emailRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/feedback', feedbackRouter);
app.use('/api/votes', votesRout);


// Error handling middleware
app.use(notFound);
// app.use(errorhandler);

const PORT = 3003;
app.listen(PORT, () => console.log(`Server Started on PORT ${PORT}`));
