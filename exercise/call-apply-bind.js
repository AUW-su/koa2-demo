// call/apply/bind的实现和使用
function f(a,b) {
    console.log(a+b);
    console.log(this.name)
}
let obj = {
    name: 1
}

// 实现一个call方法：
// 1、将myCall方法挂载到函数原型上
// 2、在myCall内将函数fn挂载到对象obj上，通过执行obj.fn() 来改变fn里面的this指向
// 3、执行obj.fn
// 4、删除obj上的fn属性
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

// f.call(obj, 1,2)

f.myCall(obj, 1,2)




// apply
// 思路: 利用this的上下文特性。
Function.prototype.myApply = function(context = window, ...args) {
    // this-->func  context--> obj  args--> 传递过来的参数
  
    // 在context上加一个唯一值不影响context上的属性
    let key = Symbol('key')
    context[key] = this; // context为调用的上下文,this此处为函数，将这个函数作为context的方法
    // let args = [...arguments].slice(1)   //第一个参数为obj所以删除,伪数组转为数组
    
    let result = context[key](args); // 这里和call传参不一样
    delete context[key]; // 不删除会导致context属性越来越多
    return result;
}

// 使用
function f(a,b){
    console.log(a, b)
    console.log(this.name)
}
let obj= {
    name:'张三'
}

f.myApply(obj,[1,2])  //arguments[1]


// bind
// bind 的实现对比其他两个函数略微地复杂了一点，因为 bind 需要返回一个函数，需要判断一些边界问题，以下是 bind 的实现
// bind 返回了一个函数，对于函数来说有两种方式调用，一种是直接调用，一种是通过 new 的方式，我们先来说直接调用的方式
// 对于直接调用来说，这里选择了 apply 的方式实现，但是对于参数需要注意以下情况：因为 bind 可以实现类似这样的代码 f.bind(obj, 1)(2)，所以我们需要将两边的参数拼接起来
// 最后来说通过 new 的方式，对于 new 的情况来说，不会被任何方式改变 this，所以对于这种情况我们需要忽略传入的 this
Function.prototype.myBind = function (context, ...outerArgs) {
    // this->func context->obj outerArgs->[10,20]
    let self = this
  
    // 返回一个函数
    return function F(...innerArgs) { //返回了一个函数，...innerArgs为实际调用时传入的参数
      // 考虑new的方式
      if(self instanceof F) {
        return new self(...outerArgs, ...innerArgs)
      }
      // 把func执行，并且改变this即可
      return self.apply(context, [...outerArgs, ...innerArgs]) //返回改变了this的函数，参数合并
    }
}

// 例子
document.body.addEventListener('click', func.bind(obj, 10, 20))

function func(params) {}

// 注意： bind之后不能再次修改this的执行，bind多次后执行，函数this还是指向第一次bind的对象