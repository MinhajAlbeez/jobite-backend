const express = require("express");
const cors = require("cors");
const app = express();
const database = require("./config/database");
const infoRoutes = require("./routes/infoRoutes");
const { validate } = require("./middlewares/validationMiddleware");
const { infoSchema } = require("./schemas/validationSchemas");
const { JobApplySchema } = require("./schemas/JobApplyValidation");
const userRoutes = require("./routes/userRoutes");
const jobPostRoutes = require("./routes/jobPostRoutes");
const jobApplyRoutes = require("./routes/JobApplyRoute");


app.use(cors());
app.use(express.json());
// app.use(express.json({ limit: '50mb' }));

app.get("/", (req, res) => {
  res.send(`server is running on port ${PORT}`);
});
app.use("/api/users", userRoutes);
app.use("/info", infoRoutes);
app.use("/jobposts", jobPostRoutes);
app.use("/jobapply", jobApplyRoutes);


const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
