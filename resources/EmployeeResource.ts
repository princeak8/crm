import { Resource, DepartmentResource } from './index';

 
class EmployeeResource extends Resource {
  toArray() {
    return {
      id: Number(this.id),
      name: this.name,
      email: this.email,
      phone_number: this.phone_number,
      department: new DepartmentResource(this.department).data
    }
  }
}
 
module.exports = EmployeeResource;