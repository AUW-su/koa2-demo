// new操作符做了这些事：
// 创建一个全新的对象
// 这个对象的__proto__要指向构造函数的原型prototype
// 执行构造函数，使用 call/apply 改变 this 的指向
// 返回值为object类型则作为new方法的返回值返回，否则返回上述全新对象

function myNew(fn, ...args) {
    console.log('***')
    console.log(...args)
    
    let instance = Object.create(fn.prototype);
    let res = fn.apply(instance, args); // 改变this指向

    // 确保返回的是一个对象(万一fn不是构造函数)
    return typeof res === 'object' ? res: instance;
}

// 验证
function Car(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
}
const auto = new Car('Honda', 'Accord', 1998);
console.log('111')
console.log(auto)

const res = myNew(Car, 'Honda', 'Accord', 1998)
console.log('222')
console.log(res)