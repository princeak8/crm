import { Customer, CustomerUpdatePayload } from "../types/requests/customer";

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class CustomerService {
  Customer = prisma.customer;

  async save(data: Customer, employee_id: number) {
    return await this.Customer.create({
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
    return await this.Customer.findMany();
  }

  async getById(id: number) {
    return await this.Customer.findUnique({
      where: { id: id },
    });
  }

  async update(data: CustomerUpdatePayload) {
    const id = data.id;
    return await this.Customer.update({
      where: { id },
      data,
    });
  }

  async getByEmail(email: string) {
    return await this.Customer.findUnique({
      where: { email: email },
    });
  }

  async getByPhoneNumber(phone_number: string) {
    return await this.Customer.findUnique({
      where: { phone_number: phone_number },
    });
  }

  async getByEmailOrPhoneNumber(email: string, phone_number: string) {
    return await this.Customer.findFirst({
      where: {
        OR: [
          {
            email: email,
          },
          {
            phone_number: phone_number,
          },
        ],
      },
    });
  }

  async EmailOrPhoneNumberExists(phone_number: string, email = null) {
    if (email) {
      return await this.getByEmailOrPhoneNumber(email, phone_number);
    } else {
      return await this.getByPhoneNumber(phone_number);
    }
  }
}

export default CustomerService;
