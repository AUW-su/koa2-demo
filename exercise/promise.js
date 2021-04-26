// function Primose () {
//     let self = this;
//     self.status = 'pending';
//     self.value = undefined; // 接受成功的值
//     self.reason = undefined; // 接收成功的值

//     function resolve(value) {
//         if (self.status = 'pending') {
//             self.value = value;
//             self.status = 'fulfilled'
//         }
//     }
//     function reject(reason) {
//         if (self.status = 'pending') {
//             self.reason = reason;
//             self.status = 'rejected'
//         }
//     }
//     executor(resolve, reject)
// }

// Promise.prototype.then = function(onfulfilled, onrejected) {
//     if (self.status === 'fulfilled') {
//         onfulfilled(self.value);
//     }
//     if (self.status === 'rejected') {
//         onfulfilled(self.reason);
//     }  
// }



// Promise.all()的实现

let p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('p1 resolved');
    }, 1000);
});

let p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('p2 resolved');
    }, 2000);
})

console.time('cost')
Promise.all([p1, p2]).then(res => {
    console.log(res);
    console.timeEnd('cost')
});