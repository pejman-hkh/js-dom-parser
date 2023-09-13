import Parser from "../src/Parser.js";

const p = new Parser( '<div class="test">ss<span class="aa" id="gg">innnerssss</span><span class="aa">innnnn</span></div><div class="test1">eee</div>');

console.log( p.find(".test", 0).getElementById('gg') );
console.log( p.find(".test", 0).getElementsByTagName('span') );