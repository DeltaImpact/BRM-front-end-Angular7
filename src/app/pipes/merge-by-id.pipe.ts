import { Pipe } from "@angular/core";

@Pipe({
  name: "mergeById"
})
export class MergeByIdPipe {
  transform(arr1, arr2) {
    return [...arr1, ...arr2].filter(onlyUnique).sort(o => o.id);
  }
}

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}
