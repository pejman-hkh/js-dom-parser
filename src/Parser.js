import Attrs from "./Attr.js";
import Tag from "./Tag.js";
import Find from "./Find.js";

export default class Parser {
    ParseAttr() {
        let attrs = new Attrs();
        let attr = '';
        let nowAttr = '';
        let c1;
        while (!this.empty(c1 = this.nextTok())) {
            if (c1 == ' ') {
                attr = '';
                continue;
            }
            if (c1 == '=') {
                nowAttr = attr;
                attr = '';
                let t = '';
                if (this.html[this.i] == '"' || this.html[this.i] == "'") {
                    t = this.html[this.i];
                    this.i++;
                }
                let value = '';
                let c2;
                while (!this.empty(c2 = this.nextTok())) {
                    if (c2 == t) {
                        break;
                    }
                    value += c2;
                }
                attrs[nowAttr] = value;
                attr = '';
            }
            attr += c1;
            if (c1 == '>') {
                break;
            }
        }
        return attrs;
    }
    ParseTag() {
        if (this.html[this.i + 1] == '/') this.i++;
        let tag = '';
        let c1;
        let attrs;
        while (c1 = this.html[this.i++]) {
            if (c1 == '>') {
                break;
            }
            if (c1 == ' ') {
                attrs = this.ParseAttr();
                break;
            }
            tag += c1;
        }
        let ret = new Tag(this);
        ret.tag = tag;
        if (attrs)
            ret.attrs = attrs;
        if (tag.substr(0, 1) == '/') {
            ret.isEnd = true;
            ret.tag = tag.substr(1);
        }
        if (tag.substr(-1) == '/') {
            ret.tag = tag.substr(0, -1);
        }
        return ret;
    }

    parseContents() {
        this.i--;
        var content = '';
        let c1;
        while (!this.empty(c1 = this.nextTok())) {
            if (c1 == '<') {
                break;
            }
            content += c1;
        }
        this.i--;
        var tag = new Tag(this);
        tag.tag = 'empty';
        tag.content = content;
        return tag;
    }

    nextTok() {
        var ret = this.html[this.i++];
        return ret;
    }

    empty(a) {
        return (a === undefined || a === null || a === '') && a !== '0';
    }

    parseComment() {
        this.i += 3;
        var content = '';
        while (!this.empty(c1 = this.nextTok())) {
            if (c1 == '-' && this.html[this.i] == '-' && this.html[this.i + 1] == '>')
                break;
            content += c1;
        }
        this.i += 3;
        var tag = new Tag(this);
        tag.tag = 'comment';
        tag.content = content;
        return tag;
    }

    next1() {
        let c = this.html[this.i++];
        if (!c) return;
        if (c === '<') {
            if (this.html[this.i] === '!' && this.html[this.i + 1] === '-' && this.html[this.i + 2] === '-') {
                return this.parseComment();
            }
            if (this.html[this.i] === ' ') {
                this.i++;
                let cn = this.parseContents();
                cn.content = '<' + cn.content;
                return cn;
            }
            return this.ParseTag();
        } else {
            return this.parseContents();
        }
    }

    next() {
        this.current = this.next1();
        return this.current;
    }

    isEqual(text) {
        let i = this.i;
        let html = this.html;
        let j = 0;
        while (c = text[j++]) {
            if (html[i++] != c)
                return false;
        }
        return true;
    }

    parseScriptInner() {
        let content = '';
        while (!this.empty(c1 = this.nextTok())) {
            if (c1 == '<') {
                if (this.isEqual('/script')) {
                    break;
                }
            }
            content += c1;
        }
        this.i += 8;
        return content;
    }

    getTag() {
        let tag = this.next();
        if (!tag)
            return;
        if (['comment', 'empty', '!DOCTYPE', 'area', 'base', 'col', 'embed', 'param', 'source', 'track', 'meta', 'link', 'br', 'input', 'hr', 'img'].includes(tag.tag))
            return tag;
        if (tag.isEnd)
            return tag;
        if (tag.tag == 'script') {
            let content = this.parseScriptInner();
            tag.content = content;
        } else {
            let childrens = this.parse();
            if (childrens)
                tag.childrens = childrens;
        }
        if (tag.tag == this.current.tag)
            return tag;
        while (etag = this.next()) {
            if (tag.tag == etag.tag)
                break;
        }
        return tag;
    }

    parse() {
        let tags = [];
        let tag;
        while( tag = this.getTag() ) {
            if( tag.isEnd ) break;
            if( tag.tag == 'empty' && (tag.content).trim() === '' )
                continue;
            tags.push(tag);
        }
        return tags;
    }

    find( query = '', index = [] ) {
        let f = new Find();
        return f.find( query, this.tags, index );
    }

    constructor( html ) {
        this.tags = [];
        this.html = html;
        this.i = 0;
        this.id = 0;
        this.tags = this.parse();
    }

}