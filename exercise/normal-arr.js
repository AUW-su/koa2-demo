// 1、forEach
// forEach() 方法对数组的每个元素执行一次给定的函数。
// arr.forEach(callback(currentValue [, index [, array]])[, thisArg]) // []是可选的参数
// 除了抛出异常以外，没有办法中止或跳出 forEach() 循环。如果你需要中止或跳出循环，forEach() 方法不是应当使用的工具

var array1 = ['a', 'b', 'c'];
array1.forEach(element => console.log(element));

// ************************
Array.prototype.myForEach = function(callback, context = window) {
    var self = this; // this 指向调用这个方法的 arr
    var len = self.length;
  
    for (var i = 0; i < len; i++) {
      typeof callback == 'function' && callback.call(context, self[i], i)
    }
}

array1.myForEach(element => console.log(element));

// ************************

// 2、filter
// filter() 方法创建一个新数组, 其包含通过所提供函数实现的测试的所有元素。 
var words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];
var result = words.filter(word => word.length > 6);
console.log(result);

// ************************
Array.prototype.myFilter = function (callback, context = window) {
  var len = this.length;
  var newArr = [];
    
  for (var i=0; i < len; i++) {
    if (callback.apply(context, [this[i], i , this])) {
      // filter的条件为真 就认为满足条件
      newArr.push(this[i]);
    }
  }
  return newArr;
}

var result1 = words.myFilter(word => word.length > 6);
console.log(result1);

// ************************

// 3、map
// map() 方法创建一个新数组，其结果是该数组中的每个元素是调用一次提供的函数后的返回值。
// 回调函数的参数有哪些，返回值如何处理
// 不修改原来的数组
Array.prototype.myMap = function(callback, context){
  // 转换类数组
  //由于是ES5所以就不用...展开符了
  // slice() 方法返回一个新的数组对象，这一对象是一个由 begin 和 end 决定的原数组的浅拷贝（包括 begin，不包括end）。原始数组不会被改变。
  var arr = Array.prototype.slice.call(this);
  var newArr = [];

  for (var i = 0; i < arr.length; i++) {
    // 把当前值、索引、当前数组返回去。调用的时候传到函数参数中 [1,2,3,4].map((curr,index,arr))
    newArr.push(callback.call(context, arr[i], i, this));
  }

  return newArr;
}

// 4、reduce
// reduce() 方法对数组中的每个元素执行一个由您提供的reducer函数(升序执行)，将其结果汇总为单个返回值。
// reducer 函数接收4个参数: Accumulator (acc) (累计器) + Current Value (cur) (当前值) 
// + Current Index (idx) (当前索引) + Source Array (src) (源数组)
// 初始值不传怎么处理
// 回调函数的参数有哪些，返回值如何处理。

const array4 = [1, 2, 3, 4];
const reducer = (accumulator, currentValue) => accumulator + currentValue;

// 1 + 2 + 3 + 4
console.log(array4.reduce(reducer));
// expected output: 10

// 5 + 1 + 2 + 3 + 4
console.log(array4.reduce(reducer, 5));
// expected output: 15

// ************************

Array.prototype.myReduce = function (fn, initialValue) {
  var arr = Array.prototype.slice.call(this);
  var res, startIndex;

  res = initialValue ? initialValue : arr[0]; // 不传默认取数组第一项
  startIndex = initialValue ? 0 : 1;

  for (var i = startIndex; i < arr.length; i++) {
    // 把初始值、当前值、索引、当前数组返回去。
    // 调用的时候传到函数参数中 [1,2,3,4].reduce((initVal,curr,index,arr))
    res = fn.call(null, res, arr[i], i, this); 
  }
  return res;
}