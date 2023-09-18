import Find from "./Find.js";

export default class Tag {
	constructor() {
	}
	__get(key) {
		if (this.attrs[key])
			return this.attrs[key];
		return this[key];
	}
	__set(key, value) {
		if (this.attrs[key])
			this.attr(key, value);
		this[key] = value;
	}
	find(query, index = []) {
		const f = new Find();
		return f.find(query, [this], index);
	}
	remove() {
		delete this.parent.childrens[this.eq];
		this.updateParentsHtml(this.parent);
	}
	notEmpty() {
		const ret = [];
		for (const child of this.childrens) {
			if (child.tag !== 'empty')
				ret.push(child);
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
		if (value)
			return this.setAttribute(name, value);
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
	parent() {
		return this.parent;
	}
	next() {
		return this.next;
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

	updateParentsHtml(parent) {
	    parent.html = parent.getHtml();
	    if (parent.parent) {
	        updateParentsHtml(parent.parent);
	    }
	}

	html(html) {
	    if (html) {
	        var p = new Parser(html);
	        var childs = p.find();
	        this.childrens = childs;
	        childs.forEach(function(child) {
	            child.parent = this;
	        });
	        this.html = this.getHtml();
	        updateParentsHtml(this.parent);
	        return this;
	    }
	    return this.html;
	}

	getHtml() {
	    return this.concatHtmls(this.childrens);
	}

	outerHtml() {
	    return makeHtml(this, this.concatHtmls(this.childrens));
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