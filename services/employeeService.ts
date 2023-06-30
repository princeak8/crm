const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');

import { SaveEmployeePayload } from "../types/employee";

class EmployeeService {
    Employee = prisma.employee;

    async save(data: SaveEmployeePayload) {
        data.password = bcrypt.hashSync(data.password, 8);
        return await this.Employee.create({
            data
        });
    }

    async getAll() {
        return await this.Employee.findMany({
            include: { department: true },
        });
    }

    async getById(id: number) {
        return await this.Employee.findUnique({
            where: {'id': id},
            include: { department: true }
        });
    }
    
    async getByEmail(email: string) {
        return await this.Employee.findUnique({
            where: {'email': email},
            include: { department: true }
        });
    }

    async getByPhoneNumber(phone_number: string) {
        return await this.Employee.findUnique({
            where: {'phone_number': phone_number},
            include: { department: true }
        });
    }

    async getByEmailOrPhoneNumber(email: string, phone_number: string) {
        return await this.Employee.findFirst({
            where: {
                OR: [
                    {
                       email: email 
                    },
                    {
                        phone_number: phone_number
                    }
                ]
            }
        });
    }

    async EmailOrPhoneNumberExists(phone_number: string, email=null) {
        if(email) {
            return await this.getByEmailOrPhoneNumber(email, phone_number);
        }else{
            return await this.getByPhoneNumber(phone_number);
        }
    }
}

export default EmployeeService;