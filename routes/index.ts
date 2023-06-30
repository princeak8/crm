const express = require('express');
const router = express.Router();
const EmployeeAuth = require("../middlewares/EmployeeAuth");

//Import controllers
import ProspectController from "../controllers/ProspectController";
import CustomerController from "../controllers/CustomerController";
import EmployeeController from "../controllers/EmployeeController";
import AuthController from "../controllers/AuthController";

router.post('/login', AuthController.login);

router.post('/prospect/save', EmployeeAuth, ProspectController.save);
router.get('/prospect', EmployeeAuth, ProspectController.all);
router.get('/prospect/:id', EmployeeAuth, ProspectController.get);

router.post("/customer/save", EmployeeAuth, CustomerController.save);
router.get("/customer", EmployeeAuth, CustomerController.all);
router.get("/customer/:id", EmployeeAuth, CustomerController.get);
router.patch("/customer/update", EmployeeAuth, CustomerController.update);

router.post('/employee/save', EmployeeController.save);
router.get('/employee', EmployeeAuth, EmployeeController.all);
router.get('/employee/:id', EmployeeAuth, EmployeeController.get);

module.exports = router;