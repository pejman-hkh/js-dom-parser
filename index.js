import Parser from './src/Parser.js';

let p = new Parser('<div class="test"><span>ddd</span></div><div class="test1"><span id="fff">fff</span></div>');
console.log(p.find(".test1",0).prev().html());