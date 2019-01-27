import {Deserializable} from '../../../shared/interfaces/deserializable.interface';

export class Permission implements Deserializable {
  id: number;
  name: string;

  constructor(permission: any = {}) {
    this.id = permission.id;
    this.name = permission.name || '';
  }

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
