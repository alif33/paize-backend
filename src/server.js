const express = require("express");
const env = require("dotenv");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin/auth");
const schoolRoutes = require("./routes/school");
const studentRoutes = require("./routes/student");
const contactRoutes = require("./routes/contact");
const paymentRoutes = require("./routes/payment");
const uploadsRoutes = require("./routes/uploads");

env.config();

mongoose
  .connect(
    `mongodb+srv://${ process.env.DB_USER }:${ process.env.DB_PASSWORD }@cluster0.uo7o9f7.mongodb.net/${ process.env.DB_DATABASE }?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(() => {
    console.log("Database connected");
  });

app.use(cors());
app.use(express.json());
app.use(express.static("uploads"));
app.use("/api", authRoutes);
app.use("/api", adminRoutes);
app.use("/api", schoolRoutes);
app.use("/api", studentRoutes);
app.use("/api", contactRoutes);
app.use("/api", paymentRoutes);
app.use("/api", uploadsRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

//mVC

//M-Model
//v-views
//c-controller