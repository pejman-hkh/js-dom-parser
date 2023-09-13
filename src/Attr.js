export default class Attrs {
    classes() {
        return this.class?this.class.split(" "):[];
    }
    set(key, value) {
        this[key] = value;
    }
    get(key) {
        return this[key];
    }
    makeAttrsText() {
        let ret = '';
        let pre = '';
        for (let attr in this) {
            let value = this[attr];
            ret += pre + attr + '="' + value + '"';
            pre = ' ';
        }
        return ret;
    }
}