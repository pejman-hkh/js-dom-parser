export default class NodeList {
  push( element ) {
    this.length++;
    this.list.push(element);
  }
}