import Parser from './index.js';

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

console.log( p.find("body",0).find("div") );