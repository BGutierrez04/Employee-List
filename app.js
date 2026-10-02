import express from "express";
import employees from "./db/employees.js";

const app = express();
export default app;

app.route("/").get((req, res) => {
  res.send("Hello employees!");
});

app.route("/employees").get((req, res) => {
  res.send(employees);
});

let lastRandomEmployeeId;

app.route("/employees/random").get((req, res) => {
  let randomEmployee;

  do {
    const randomIndex = Math.floor(Math.random() * employees.length);
    randomEmployee = employees[randomIndex];
  } while (employees.length > 1 && randomEmployee.id === lastRandomEmployeeId);

  lastRandomEmployeeId = randomEmployee.id;

  res.send(randomEmployee);
});

app.route("/employees/:id").get((req, res) => {
  const { id } = req.params;
  const employee = employees.find((employee) => {
    if (employee.id === Number(id)) {
      return employee;
    }
  });

  if (!employee) {
    return res.status(404).send("non-existent employee");
  }

  res.send(employee);
});
