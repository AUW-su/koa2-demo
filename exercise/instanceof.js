function myInstanceof(example, classFunc) {
    console.log('1111')
    let proto = Object.getPrototypeOf(example); // Object.getPrototypeOf() 方法返回指定对象的原型（内部[[Prototype]]属性的值
    while(true) {
        if(proto === null) return false;

        // 在当前实例对象的原型链上，找到了当前类
        if(proto === classFunc.prototype) return true;
        // 沿着原型链__ptoto__一层一层向上查
        proto = Object.getPrototypeOf(proto); // 等于proto.__ptoto__
    }
}

// function myInstanceof(example, classFunc) {
//     console.log('222')

//     let proto = example.__proto__;
//     while(true) {
//         if(proto == null) return false;

//         // 在当前实例对象的原型链上，找到了当前类
//         if(proto == classFunc.prototype) return true;
//         // 沿着原型链__ptoto__一层一层向上查
//         proto = proto.__ptoto__; // 等于proto.__ptoto__
//     }
// }

var proto = {};
var obj = Object.create(proto);

let res = myInstanceof(obj, Object)

// function Car(make, model, year) {
//     this.make = make;
//     this.model = model;
//     this.year = year;
// }
// const auto = new Car('Honda', 'Accord', 1998);

// let res = myInstanceof(auto, Car);

console.log(res)

console.log(obj instanceof Object);
