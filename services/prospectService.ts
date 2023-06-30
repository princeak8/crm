const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

import { SaveProspectPayload } from "../types/requests/prospect";

class ProspectService {
    Prospect = prisma.prospect;

    async save(data: SaveProspectPayload, employee_id: number) {
        return await this.Prospect.create({
            data: {
                ...data,
                employees: {
                    create: [
                        {
                            employee: {
                                connect: {
                                    id: employee_id
                                }
                            }
                        }
                    ]
                }
            },
            include: {
                employees:  {
                    include: {
                        employee: true
                    }
                }
            }
        });
    }

    async getAll() {
        return await this.Prospect.findMany();
    }

    async getById(id: number) {
        return await this.Prospect.findUnique({
            where: {'id': id}
        });
    }
    
    async getByEmail(email: string) {
        return await this.Prospect.findUnique({
            where: {'email': email}
        });
    }

    async getByPhoneNumber(phone_number: string) {
        return await this.Prospect.findUnique({
            where: {'phone_number': phone_number}
        });
    }

    async getByEmailOrPhoneNumber(email: string, phone_number: string) {
        return await this.Prospect.findFirst({
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

export default ProspectService;