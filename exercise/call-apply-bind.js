// call/apply/bind的实现和使用


function f(a,b) {
    console.log(a+b);
    console.log(this.name)
}
let obj = {
    name:1
}

// 实现一个call方法：
// 1、将myCall方法挂载到函数原型上
// 2、在myCall内将函数fn挂载到对象obj
// 3、执行fn
// 4、删除

Function.prototype.myCall = function(context = window, ...args) {
    // this-->func  context--> obj  args--> 传递过来的参数

    // 在context上加一个唯一值不影响context上的属性
    let key = Symbol('key')

    // context为调用的上下文,this此处为函数，将这个函数作为context的方法
    context[key] = this; 
    // let args = [...arguments].slice(1)   //第一个参数为obj所以删除,伪数组转为数组

    let result = context[key](...args);

    delete context[key]; // 不删除会导致context属性越来越多

    return result;
};


// f(1, 2);
// console.log('********')

// f.call(obj, 1,2)
// console.log('********')

// f.myCall(obj, 1,2)
// console.log('********')


// function person () {
//     console.log(this.name);
// }

// var egg = {
//     name: '老师'
// }

// Function.prototype.newCall = function (obj) {
//     console.log(this)
// }

// person.newCall(egg)

