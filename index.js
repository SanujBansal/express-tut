const express = require("express");
const fileUpload = require("express-fileupload");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  })
);

app.set("view engine", "pug");
app.set("views", "./views");

// usecases of a middle ware Add auth, validation of request, file handling or using third party libraries from npm

const middleware = (request, response, next) => {
  console.log("This is middleware");
  request.hello = "hi om";
  next();
};

const errorMiddleware = (request, response, next, err) => {
  console.log("This is error middleware");
  next("Here is the error:", err);
};

app.get("/om/*/:somenumber", middleware, (request, response, nextFn) => {
  console.log(request.params.somenumber);
  response.send(200, `${request.params.somenumber}`);
});

app.get("/", (request, response, nextFn) => {
  response.render("firstView");
});

app.post("/submitForm", (req, res) => {
  // This was required to handle form values from submit in the pub handler -> app.use(express.urlencoded({ extended: false }));
  console.log(req.body);
  res.send(200, req.body);
});

app.post("/files", (req, res) => {
  // we have access to req.file due to express-fileupload.
  console.log(req.files);
  res.status(200).send(req.files);
  //   We have access to some important properties inside each file like name, size, mimetype, md5, data and we can access them like req.files.<filename>.name
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
