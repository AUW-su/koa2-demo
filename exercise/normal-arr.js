// forEach
Array.prototype.myForEach = function(callback, context=window) {
    // this=>arr
    let self = this,  
        i = 0,
        len = self.length;
  
    for(;i<len;i++) {
      typeof callback == 'function' && callback.call(context,self[i], i)
     }
}

// filter
Array.prototype.myFilter = function(callback, context=window){

    let len = this.length
        newArr = [],
        i=0
  
    for(; i < len; i++){
      if(callback.apply(context, [this[i], i , this])){
        newArr.push(this[i]);
      }
    }
    return newArr;
}

// map
// 回调函数的参数有哪些，返回值如何处理
// 不修改原来的数组
Array.prototype.myMap = function(callback, context){
    // 转换类数组
    var arr = Array.prototype.slice.call(this),//由于是ES5所以就不用...展开符了
        mappedArr = [], 
        i = 0;
  
    for (; i < arr.length; i++ ){
      // 把当前值、索引、当前数组返回去。调用的时候传到函数参数中 [1,2,3,4].map((curr,index,arr))
      mappedArr.push(callback.call(context, arr[i], i, this));
    }
    return mappedArr;
}

// 实现reduce
// 初始值不传怎么处理
// 回调函数的参数有哪些，返回值如何处理。
Array.prototype.myReduce = function(fn, initialValue) {
    var arr = Array.prototype.slice.call(this);
    var res, startIndex;
  
    res = initialValue ? initialValue : arr[0]; // 不传默认取数组第一项
    startIndex = initialValue ? 0 : 1;
  
    for(var i = startIndex; i < arr.length; i++) {
      // 把初始值、当前值、索引、当前数组返回去。调用的时候传到函数参数中 [1,2,3,4].reduce((initVal,curr,index,arr))
      res = fn.call(null, res, arr[i], i, this); 
    }
    return res;
}