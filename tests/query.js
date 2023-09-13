import Parser from "../src/Parser.js";

const p = new Parser( '<div><div class="test">ss</div></div><div class="test1">eee</div>');
console.log( p.find(".test,.test1") );