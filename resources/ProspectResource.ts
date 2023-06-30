import { Resource, ProspectEmployeesResource } from './index';

 
class ProspectResource extends Resource {
  toArray() {
    return {
      id: Number(this.id),
      name: this.name,
      email: this.email,
      phone_number: this.phone_number,
      address: this.address,
      employees: ProspectEmployeesResource.collection(this.employees)
    }
  }
}
 
module.exports = ProspectResource;