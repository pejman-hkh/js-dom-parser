import Parser from "../src/Parser.js";


let p = new Parser( `
<html>
<body>
<prev1 class="prev">
  dd
</prev1>

<prev class="prev">
  dd
</prev>

<div class="test test1">
dd <span>aaa</span>
</div>

<next class="next">
  dd
</next>

<next1 class="next">
  dd
</next1>

<input type="text" />
<input type="button" />

<div class="test1">ddd<div id="test">aaa</div></div>


</body>
</html> ` );

console.log( p.querySelectorAll("body") );
/*let tests;
console.log(tests = p.find(".test1"));
let test = tests[0];
console.log( test.outerHtml() );

console.log( test.next());
console.log( test.prev() );

console.log( test.text() );

console.log( p.find("body") );
console.log( p.find("input[type=button]") );*/