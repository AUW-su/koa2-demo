


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