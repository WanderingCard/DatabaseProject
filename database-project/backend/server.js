import express from "express";
import cors from "cors";
import records from "./routes/record.js"
// import cars from "./routes/car.js"
// import customers from "./routes/customer.js"
// import jobs from "./routes/job.js"
// import makes from "./routes/make.js"
// import models from "./routes/model.js"
// import services from "./routes/service.js"
// import technicans from "./routes/technican.js"

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/record", records);
// app.use("/cars", cars);
// app.use("/customers", customers);
// app.use("/jobs", jobs);
// app.use("/makes", makes);
// app.use("/models", models);
// app.use("/services", services);
// app.use("/technicans", technicans);


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});