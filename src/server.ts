import express from "express";
import cors from "cors";
import {
  sample_cip_student,
  sample_diul_student,
  sample_official,
  sample_student,
} from "./data";

const app = express();
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:4200"],
  })
);

app.get("/api/official", (req, res) => {
  res.send(sample_official);
});

//Filter
app.post("/api/official/", (req, res) => {
  const { name, lastname, position } = req.body;
  // let officials: any[] = [];

  const officials = sample_official.filter((official) => {
    const matchesName = name
      ? official.name.toLowerCase().includes(name.toLowerCase())
      : true;
    const matchesLastname = lastname
      ? official.lastname.toLowerCase().includes(lastname.toLowerCase())
      : true;
    const matchesPosition = position
      ? official.position.toLowerCase().includes(position.toLowerCase())
      : true;

    return matchesName && matchesLastname && matchesPosition;
  });
  res.send(officials);
});

app.get("/api/official/officialId/:officialId", (req, res) => {
  const officialId = req.params.officialId;
  const officials = sample_official.find(
    (official) => official.id == officialId
  );
  res.send(officials);
});

app.post("/api/include-official", (req, res) => {
  // const {name,lastname,position} =req.body;
  const official = req.body;
  sample_official.push(official);
  // res.send(sample_official);
});
/////////////////////////////////////////////////////////////////////////////////
app.put("/api/modify-official", (req, res) => {
  // const {name,lastname,position} =req.body;
  const officialReq = req.body;
  const { id } = req.body;

  // Encontrar el índice del official que se va a actualizar
  const index = sample_official.findIndex((official) => official.id == id);

  if (index !== -1) {
    // Actualizar el official existente
    sample_official[index] = { ...sample_official[index], ...officialReq };
    res.send(sample_official);
  }
});

app.delete("/api/official/remove-official/:officialId", (req, res) => {
  const officialId = req.params.officialId;
  const index = sample_official.findIndex(
    (official) => official.id == officialId
  );
  if (index !== -1) {
    // Actualizar el official existente
    sample_official.splice(index, 1);
    res.send(sample_official);
  }
});
app.delete("/api/official/remove-officials-check", (req, res) => {
  const { officialsCheck } = req.body;

  // Eliminar oficiales cuyos IDs están en officialsCheck
  officialsCheck.forEach((id: any) => {
    const index = sample_official.findIndex((official) => official.id === id);
    if (index !== -1) {
      sample_official.splice(index, 1);
    }
  });
  res.send(sample_official);
});

app.get("/api/student", (req, res) => {
  res.send(sample_student);
});

app.get("/api/student/ci_passport/:ci_passport", (req, res) => {
  const ci_passport = req.params.ci_passport;
  const students = sample_student.find(
    (student) => student.ci_passport == ci_passport
  );
  res.send(students);
});

app.post("/api/include-student", (req, res) => {
  const student = req.body;
  sample_student.push(student);
});
app.put("/api/modify-student", (req, res) => {
  const studentReq = req.body;
  const { ci_passport } = req.body;

  const index = sample_student.findIndex(
    (student) => student.ci_passport == ci_passport
  );

  if (index !== -1) {
    sample_student[index] = { ...sample_student[index], ...studentReq };
    res.send(sample_student);
  }
});

app.delete("/api/student/remove-student/:ci_passport", (req, res) => {
  const ci_passport = req.params.ci_passport;
  const index = sample_student.findIndex(
    (student) => student.ci_passport == ci_passport
  );
  if (index !== -1) {
    sample_student.splice(index, 1);
    res.send(sample_student);
  }
});
app.delete("/api/student/remove-students-check", (req, res) => {
  const { studentsCheck } = req.body;

  studentsCheck.forEach((ci_passport: any) => {
    const index = sample_student.findIndex(
      (student) => student.ci_passport === ci_passport
    );
    if (index !== -1) {
      sample_student.splice(index, 1);
    }
  });
  res.send(sample_student);
});

app.get("/api/cip-student", (req, res) => {
  res.send(sample_cip_student);
});

app.get("/api/cip-student/:searchTerm", (req, res) => {
  // const searchTerm = req.params.searchTerm;
  // const cip_student = sample_cip_student.filter((cip_student) =>
  //   cip_student.name.toLowerCase().includes(searchTerm.toLowerCase())
  // );
});

app.get("/api/cip-student/student/:student", (req, res) => {
  const student = req.params.student;
  const cip_student = sample_cip_student.find(
    (cip_student) => cip_student.student == student
  );
  res.send(cip_student);
});

app.post("/api/include-cip-student", (req, res) => {
  // const {name,lastname,position} =req.body;
  const cip_student = req.body;
  sample_cip_student.push(cip_student);
  // res.send(sample_cip_student);
});
/////////////////////////////////////////////////////////////////////////
app.post("/api/modify-cip-student", (req, res) => {
  // const {name,lastname,position} =req.body;
  const cip_student = req.body;
  sample_cip_student.push(cip_student);
  // res.send(sample_cip_student);
});

app.get("/api/cip-student/remove-cip-student/:student", (req, res) => {
  const student = req.params.student;
  const cip_student = sample_cip_student.find(
    (cip_student) => cip_student.student == student
  );
  res.send(cip_student);
});

app.get("/api/diul-student", (req, res) => {
  res.send(sample_diul_student);
});

app.get("/api/diul-student/:searchTerm", (req, res) => {
  // const searchTerm = req.params.searchTerm;
  // const cip_student = sample_cip_student.filter((cip_student) =>
  //   cip_student.name.toLowerCase().includes(searchTerm.toLowerCase())
  // );
});

app.get("/api/diul-student/student/:student", (req, res) => {
  const student = req.params.student;
  const diul_student = sample_diul_student.find(
    (diul_student) => diul_student.student == student
  );
  res.send(diul_student);
});

app.post("/api/include-diul-student", (req, res) => {
  // const {name,lastname,position} =req.body;
  const diul_student = req.body;
  sample_diul_student.push(diul_student);
  // res.send(sample_cip_student);
});
/////////////////////////////////////////////////////////////////////////////////////////////////////
app.post("/api/modify-diul-student", (req, res) => {
  // const {name,lastname,position} =req.body;
  const diul_student = req.body;
  sample_diul_student.push(diul_student);
  // res.send(sample_cip_student);
});

app.get("/api/cip-student/remove-diul-student/:student", (req, res) => {
  const student = req.params.student;
  const cip_student = sample_cip_student.find(
    (cip_student) => cip_student.student == student
  );
  res.send(cip_student);
});

const port = 5000;
app.listen(port, () => {
  console.log("Website served on http://localhost:" + port);
});
