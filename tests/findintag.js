import Parser from "../src/Parser.js";

const p = new Parser( '<div><div class="test">ss<span class="aa">innnerssss</span><span class="aa">innnnn</span></div></div><div class="test1">eee</div>');
console.log( p.find(".test", 0).find(".aa") );