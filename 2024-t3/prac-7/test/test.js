const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
const express = require("express");
const bodyParser = require("body-parser");

chai.use(chaiHttp);

describe("Student Routes", function () {
  let server;
  let app;

  before(function (done) {
    app = express();  // Create an instance of the Express application
    app.use(bodyParser.json()); // Use bodyParser middleware to parse JSON data in requests


    // Mock student data
    let students = [{ name: "Anusha Katuwal", email: "anush@gmail.com", courseId: "sit718" }];
    
      // Define the POST endpoint to add a student
    app.post("/student/add", (req, res) => {
      const { name, email, courseId } = req.body;

      // Check for missing or invalid fields
      if (!name || !email || !courseId) {
        return res.status(400).send({ message: "Failed to add student" });
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).send({ message: "Failed to add student" });
      }

      // Validate courseId (example of simple validation)
      if (courseId !== "sit718" && courseId !== "sit719") {
        return res.status(400).send({ message: "Failed to add student" });
      }

      // Add student
      students.push({ name, email, courseId });
      res.status(200).send({ message: "Student added successfully!" });
    });


    // Define the GET endpoint to fetch all students
    app.get("/student", (req, res) => {
      res.status(200).send(students);  // Send the list of students as a response
    });

    server = app.listen(3000, () => {
      done();   // Call done() to indicate that the setup is complete and the tests can run
    });
  });

  after(function (done) {
    if (server && server.listening) {
      server.close(()  => {
        done(); // Close the server after tests and signal that cleanup is done
      });
    } else {
      done();  // If server is not running, just signal cleanup is done
    }
  });

  describe("Add Student", function () {
    it("should add a new student and return success message", function (done) {
      this.timeout(5000); // Increased timeout for this test (5 seconds)
      chai
        .request(server)
        .post("/student/add")
        .send({ name: "Anusha Katuwal", email: "anush@gmail.com", courseId: "sit718" })
        .end(function (err, res) {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal("Student added successfully!");
          done();
        });
    });

    it("should return error message if student creation fails due to missing name", function (done) {
      this.timeout(5000);
      chai
        .request(server)
        .post("/student/add")
        .send({ name: "", email: "anush@gmail.com", courseId: "sit718" })
        .end(function (err, res) {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal("Failed to add student");
          done();
        });
    });

    it("should return error message if student creation fails due to missing email", function (done) {
      this.timeout(5000);
      chai
        .request(server)
        .post("/student/add")
        .send({ name: "Anusha Katuwal", email: "", courseId: "sit718" })
        .end(function (err, res) {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal("Failed to add student");
          done();
        });
    });

    it("should return error message if student creation fails due to missing courseId", function (done) {
      this.timeout(5000);
      chai
        .request(server)
        .post("/student/add")
        .send({ name: "Anusha Katuwal", email: "anush@gmail.com", courseId: "" })
        .end(function (err, res) {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal("Failed to add student");
          done();
        });
    });

    it("should return error message if email format is invalid", function (done) {
      this.timeout(5000);
      chai
        .request(server)
        .post("/student/add")
        .send({ name: "Anusha Katuwal", email: "invalid-email", courseId: "sit718" })
        .end(function (err, res) {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal("Failed to add student");
          done();
        });
    });

    it("should return error message if courseId is invalid", function (done) {
      this.timeout(5000);
      chai
        .request(server)
        .post("/student/add")
        .send({ name: "Anusha Katuwal", email: "anush@gmail.com", courseId: "invalid-course" })
        .end(function (err, res) {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal("Failed to add student");
          done();
        });
    });
  });

  describe("Fetch Students", function () {
    it("should fetch all students and return them", function (done) {
      this.timeout(5000);
      chai
        .request(server)
        .get("/student")
        .end(function (err, res) {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an("array");

          done();
        });
    });
  });
});
