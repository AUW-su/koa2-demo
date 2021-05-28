


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