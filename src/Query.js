export default class Query {
    getQueries() {
        let c = this.query[this.iq];
        if (c == ' ' || c == ',' || c == '>') {
            this.iq++;
            return c;
        }
        let a = '';
        while (c = this.query[this.iq++]) {
            this.sep = ' ';
            if (c == ' ' || c == ',' || c == '>') {
                this.iq--;
                break;
            }
            a += c;
        }
        return a;
    }
    getStr() {
        let a = '';
        let c;
        while (c = this.mQuery[this.miq++]) {
            if (['#', '.', '[', '=', ']'].includes(c))
                break;
            a += c;
        }
        this.miq--;
        return a;
    }
    parseQuery() {
        let ret = {};
        let c;
        while (c = this.mQuery[this.miq++]) {
            if (c == '.') {
                ret['class'] = this.getStr();
            } else if (c == '#') {
                ret['id'] = this.getStr();
            } else if (c == ']') {
                this.miq++;
            } else if (c == '[') {
                let key = this.getStr();
                this.miq++;
                ret[key] = this.getStr();
            } else {
                this.miq--;
                ret['tag'] = this.getStr();
            }
        }
        return ret;
    }
}