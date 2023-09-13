import Parser from "../src/Parser.js";

const p = new Parser( '<div class="test">ss<span class="aa">innnerssss</span><span class="aa">innnnn</span></div><div class="test1">eee</div>');

console.log( p.find(".aa", 0).parent() );