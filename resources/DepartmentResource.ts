import { Resource } from './index';
 
class DepartmentResource extends Resource {
  toArray() {
    return {
      id: Number(this.id),
      name: this.name
    }
  }
}
 
module.exports = DepartmentResource;