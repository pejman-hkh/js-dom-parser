import Find from "./Find.js";

export default class Tag {
	constructor(parser) {
		this.parser = parser;
		this.id = parser.id++;
	}

	find(query, index = []) {
		const f = new Find();
		return f.find(query, [this], index);
	}

	notEmpty() {
		const ret = [];
		for (const child of this.childrens) {
			if (child.tag !== 'empty') {
				ret.push(child);
			}
		}
		return ret;
	}

	getElementById(id) {
		return this.find("#" + id)[0];
	}

	getElementByTagName(name) {
		return this.find(name)[0];
	}

	getElementsByTagName(name) {
		return this.find(name);
	}

	children(index = []) {
		let ret = this.notEmpty();
		if (!Array.isArray(index)) {
			ret = ret[index];
		}
		return ret;
	}

	attr(name, value = '') {
		if (value) {
			return this.setAttribute(name, value);
		}
		return this.getAttribute(name);
	}

	setAttribute(name, value) {
		this.attrs.set(name, value);
		return this;
	}

	getAttribute(name) {
		this.attrs.get(name);
		return this;
	}

	findParent(ptag = [], tags) {
		let ret = [];
		for (const tag of tags) {
			if (tag.id === this.id) {
				return ptag;
			}
			if (tag.childrens) {
				const n = this.findParent(tag, tag.childrens);
				if (n) {
					return n;
				}
			}
		}
		return;
	}

	parent() {
		return this.findParent(new Tag(this.parser), this.parser.tags);
	}
	next() {
		return this.findNext(this.parser.tags);
	}
	findNext(tags) {
		let next = false;
		let ret = [];
		for (let tag of tags) {
			if (next)
				return tag;
			if (tag.id == this.id)
				next = true;
			if (tag.childrens) {
				let n = this.findNext(tag.childrens);
				if (n)
					return n;
			}
		}
		return;
	}
	prev() {
		return this.findPrev(this.parser.tags);
	}
	findPrev(tags) {
		let ptag = '';
		for (let tag of tags) {
			if (tag.id == this.id)
				return ptag;
			if (tag.childrens) {
				let n = this.findPrev(tag.childrens);
				if (n)
					return n;
			}
			ptag = tag;
		}
	}
	makeHtml(tag, content) {
		return '<' + tag.tag + (tag.attrs ? ' ' + tag.attrs.makeAttrsText() : '') + '>' + content + '</' + tag.tag + '>';
	}
	concatHtmls(childrens) {
		let html = '';
		for (let child of childrens) {
			if (child.tag == 'empty')
				html += child.content;
			else {
				let ct = '';
				if (child.childrens)
					ct = this.concatHtmls(child.childrens);
				html += this.makeHtml(child, ct);
			}
		}
		return html;
	}
	html() {
		return this.concatHtmls(this.childrens);
	}
	outerHtml() {
		return this.makeHtml(this, this.concatHtmls(this.childrens));
	}
	
	text() {
	    return this.concatTexts(this.childrens);
	}

	concatTexts(childrens) {
	    let html = '';
	    childrens.forEach(child => {
	        if (child.content)
	            html += child.content;
	        if (child.childrens) {
	            let t = this.concatTexts(child.childrens);
	            if (t)
	                html += t;
	        }
	    });
	    return html;
	}
}