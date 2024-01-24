//
//
// var x = 10;
//
// function foo() {
//   var y= 20;
//   console.log(x + y);
// }
//
// foo(); // 30
//
// var x = 1;
//
// function foo() {
//   var x = 10;
//   bar();
// }
//
// function bar() {
//   console.log(x);
// }
//
// foo(); // 1
//
// // closure
// var increase = (function() {
//   // 카운트 상태를 유지하기 위한 자유 변수
//   var counter = 0;
//
//   return function() {
//     console.log(++counter);
//   }
// }());
//
// const onClick = function() {
//   increase();
// }
//
// // closure 응용
// function counterFoo (this: any){
//   var counter = 0;
//
//   this.increase = function () {
//     return ++counter;
//   };
//   this.decrease = function () {
//     return --counter;
//   };
// }
//
// const counter = new (counterFoo as any)();
//
// console.log(counter.increase()); // 1
// console.log(counter.decrease()); // 0