import { Resource, EmployeeResource } from './index';

 
class ProspectEmployeesResource extends Resource {
  toArray() {
    return {
      employee: new EmployeeResource(this.employee).data
    }
  }
}
 
module.exports = ProspectEmployeesResource;