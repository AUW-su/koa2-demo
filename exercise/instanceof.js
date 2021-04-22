// 步骤1：先取得当前类的原型，当前实例对象的原型链
// ​步骤2：一直循环（执行原型链的查找机制）
// 取得当前实例对象原型链的原型链（proto = proto.__proto__，沿着原型链一直向上查找）
// 如果 当前实例的原型链__proto__上找到了当前类的原型prototype，则返回 true
// 如果 一直找到Object.prototype.__proto__ == null，Object的基类(null)上面都没找到，则返回 false



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

// 这里的实现 还是有问题的，不可用
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






// let res = myInstanceof(auto, Car);

console.log(res)

console.log(obj instanceof Object);
