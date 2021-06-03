


function ajax () {
    let xhr = new XMLHttpRequest()
    xhr.open('get', 'http://www.google.com')
    xhr.onreadystatechange(() => {
        if (xhr.readystate === 4) {
            if (xhr.status >= 200 && xhr.status < 300) {
            let obj = JSON.parse(xhr.responseText) 
            // 处理obj
            }
        }
    })
    xhr.send()
}


function ajax2 (url) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest()
        xhr.open('get', url)
        xhr.onreadystatechange(() => {
            if (xhr.readyState === 4) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(JSON.parse(xhr.responseText))
                } else {
                    reject('请求出错了')
                }
            }
        })
        xhr.send()
    })
}

ajax2(url).then((res) => {
    console.log(res)
}).catch(err => {
    console.log(err)
})

// throttle
// function throttle (fn, wait) {
//     let last = 0;

//     return function () {
//         let content = this;
//         let args = arguments;

//         let now = new Date();
//         if (now - last > wait) {
//             last = now;
//             fn.apply(content, args);
//         }
//     }
// }

// const better_scroll = throttle();

// document.addEnventListen('scroll', better_scroll);



// debounce

function debounce(fn, wait) {
    let timer = null;
    return function () {
        let args = arguments;
        let content = this;

        if (timer) {
            clearTimeout(timer);
            timer = setTimeout(function () {
                fn.apply(content, args);
            }, wait)
        }
    }
}


const better_scroll = debounce();

document.addEnventListen('scroll', better_scroll);

/**
 * 解构数组 es6
 * @param targetArray{Array} 目标数组
 * @param formater{String} 解构格式
 * @return {Object} 结果对象
 */
let targetArray = [1,[2,3],4];
let formater = "[a,[b],c]";

const destructuringArray = (values, keys) => {
    try {
      const obj = {};
      if (typeof keys === 'string') {
        keys = JSON.parse(keys.replace(/\w+/g, '"$&"'));
      }
  
      const iterate = (values, keys) =>
        keys.forEach((key, i) => {
          if (Array.isArray(key)) iterate(values[i], key);
          else obj[key] = values[i];
        });
  
      iterate(values, keys);
  
      return obj;
    } catch (e) {
      console.error(e.message);
    }
  };

  var res = destructuringArray(targetArray, formater);
  console.log(res)


/**
 * 解构数组 es5
 * @param targetArray{Array} 目标数组
 * @param formater{String} 解构格式
 * @return {Object} 结果对象
 */

// // 先准备好目标数组
// var targetArray = [1,[2,3],4];
// // 再准备好解构格式
// var formater = "[a,[b],c]";

// var destructuringArray = function(targetArray, formater) {
//     var obj = {};
//     if (typeof keys === 'string') {
//         keys = JSON.parse(keys.replace(/\w+/g, '"$&"'));
//     }
//     function iterate(values, keys) {
//         for (var i = 0; i < keys.length; i++) {
//             if (Array.isArray(key)) {
//                 iterate(values[i], key);
//             } else {
//                 obj[key] = values[i];
//             }
//         }
//     }

//     iterate(targetArray, formater);
//     return obj;
// };
// var res = destructuringArray(targetArray, formater);
// console.log(res)



// 截流：第一个说了算，用时间间隔来拦截不给予响应
function throttle(fn, delay) {
    let last = 0;
    return function () {
        let now = +new Date();
        let context = this;
        let args = arguments;

        if (now - last > delay) {
            last = now;
            fn.apply(context, args);
        }
    }
}

document.addEventListener('scroll', throttle(() => {console.log('触发')}, 10000));

// 防抖：以最后一次触发为准，前面的抹平
function debounce(fn, delay) {
    let timer = null;
    return function () {
        let context = this;
        let args = arguments;
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(function() {
            fn.apply(context, args);
        }, delay)
    }
}

document.addEventListener('scroll', debounce(() => {console.log('触发')}, 10000));

// 截流防抖，在规定的时间里，进行防抖，超过规定的时间，则立即执行
function debounce(fn, delay) {
    let timer = null;
    let last = 0;

    return function () {
        let context = this;
        let args = arguments;
        let now = +new Data();
        if (now - last > delay) {
            fn.apply(context, args);
            last = now;
        } else {
            if (timer) {
                clearTimeout(timer);
            }
            timer = setTimeout(function() {
                fn.apply(context, args);
                last = now;
            }, delay)
        }
    }
}

// instanceof: 检测构造函数的prototype属性 是否出现在实例对象的原型链上
// 拿到构造函数的prototype属性 objA
// obj.__proto__(用Object.getPrototypeOf()获取) 去跟 objA 对比，相等则返回true
// 不想等的话 取obj.__proto__的 __proto__ 继续比较，直到这个对象的原型莲指向了null

function myInstanceOf (exampale, classFunc) {
    let proto = Object.getPrototypeOf(exampale); // Object.getPrototypeOf() 方法返回指定对象的原型（内部[[Prototype]]属性的值）。

    while (true) {
        if (proto === null) {
            return false;
        }
        if (proto === classFunc.prototype) {
            return true;
        }

        proto = Object.getPrototypeOf(proto);
    }
}

var proto = {};
var obj = Object.create(proto);
let res = myInstanceof(obj, Object)

console.log(res)
console.log(obj instanceof Object);


