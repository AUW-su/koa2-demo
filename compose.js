// const add = (x, y) => x+y;
// const square = z => z*z;

// const compose = (fn1, fn2) => (...args) => {
//     console.log(args)
    
//     return fn2(fn1(...args))
// }
// const fn = compose(add, square)
// console.log(fn())

/**
 * 
 * compose函数的实现方式：递归的实现方式
 */

async function fn1(next) {
    console.log('fn1');
    await next();
    console.log('end fn1');
}

async function fn2(next) {
    console.log('fn2')
    await delay()
    await next();
    console.log('end fn2');
}

function fn3(next) {
    console.log('fn3')
}

function delay() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, 2000);
    });
}

const middlewares = [fn1, fn2, fn3];
const finalFn = compose(middlewares);
finalFn();

function compose (middlewares) {
    return function () {

        return dispatch(0)
        function dispatch(i) {
            let fn = middlewares[i];
            if (!fn) {
                console.log('333')
                return Promise.resolve()
            }
            return Promise.resolve(fn(
                function next() {
                    console.log('222')
                    return dispatch(i+1)
                }
            ))
        }
    }
}