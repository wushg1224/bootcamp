console.log("Hello, world!");

var userName = "Ceci";
console.log(userName);

//scope problem
if (true) {
  var userName = "Ceci2";
  console.log(userName);
}
console.log(userName);

//es5 only has function scope, so the variable userName is redefined in the if block and affects the outer scope.
function test() {
  var userName = "Ceci3";
  console.log(userName);
}
test();
console.log(userName);

//es6 has let and const, which have block scope. So the variable userName defined in the if block does not affect the outer scope.

var userName = "Ceci";
let userName2 = "Ceci2";
let userName3 = "Ceci3";

//now all the front end developers are using let and const, so we should use them too.
const userName4 = "Ceci4";
console.log(userName4);
// userName4 = "Ceci5"; //TypeError: Assignment to constant variable.
