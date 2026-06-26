// array destructuring
let a = 1;
let b = 2;
let c = 3;
let d = 4;
console.log(a, b, c, d);

// destructuring assignment
let [x, y, z] = [1, 2, 3];
console.log(x, y, z);

//pattern matching with destructuring, as long as the pattern matches, the values will be assigned to the variables.
// nested destructuring
let [first, [second, third]] = [1, [2, 3,9,9]];
console.log(first, second, third);