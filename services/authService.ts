const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');
const jwt = require('../utils/jwt');

import { LoginPayload, LoginResponse } from "../types/auth";
import EmployeeService from "./employeeService";

const employeeService = new EmployeeService;

class AuthService {
    Employee = prisma.employee;

    async login(data: LoginPayload): Promise<LoginResponse> {
        const { email, password } = data;
        
        const employee = await employeeService.getByEmail(email); //this.UserModel.findUnique('email', email);
        if(!employee) return {success: false, message: "User not found"};

        const checkPassword = bcrypt.compareSync(password, employee.password);
        
        if(!checkPassword) return {success: false, message: "Email or Password is incorrect"};

        delete employee.password;

        const token = await jwt.signAccessToken(employee);

        return {success:true, data: employee, token: token}
    }

    
}

export default AuthService;