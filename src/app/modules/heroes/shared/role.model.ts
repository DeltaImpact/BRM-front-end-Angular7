import {Deserializable} from '../../../shared/interfaces/deserializable.interface';

export class Role implements Deserializable {
  id: number;
  name: string;

  constructor(role: any = {}) {
    this.id = role.id;
    this.name = role.name || '';
  }

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
