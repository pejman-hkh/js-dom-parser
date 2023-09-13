import Query from "./Query.js";

export default class Find {
	findAttr(attrs = [], tags) {
		let ret = [];
		for (let tag of tags) {
			let f = true;
			for (let attr in attrs) {
				let value = attrs[attr];
				if (attr === 'class') {
					let classes = tag.attrs ? tag.attrs.classes() : [];
					if (!classes.includes(value)) {
						f = false;
					}
				} else {
					let g = attr === 'tag' ? tag.tag : (tag.attrs?tag.attrs[attr]:'');
					if (g !== value) {
						f = false;
					}
				}
			}
			if (f) {
				ret.push(tag);
			}
			if (tag.childrens) {
				let found = this.findAttr(attrs, tag.childrens);
				for (let a of found) {
					ret.push(a);
				}
			}
		}
		return ret;
	}
	find(query = '', tags = [], index = []) {
		if (!query) {
			return tags;
		}
		let q = new Query();
		q.iq = 0;
		q.query = query;
		let ret = tags;
		while (query = q.getQueries()) {
			if (query === ',') {
				q.mQuery = q.getQueries();
				q.miq = 0;
				let attrs = q.parseQuery();
				let finded = this.findAttr(attrs, tags);
				for (let f of finded) {
					ret.push(f);
				}
			} else {
				q.mQuery = query;
				q.miq = 0;
				let attrs = q.parseQuery();
				ret = this.findAttr(attrs, ret);
			}
		}
		if (!Array.isArray(index)) {
			ret = ret[index];
		}
		return ret;
	}
}