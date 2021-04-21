function Primose () {
    let self = this;
    self.status = 'pending';
    self.value = undefined; // 接受成功的值
    self.reason = undefined; // 接收成功的值

    function resolve(value) {
        if (self.status = 'pending') {
            self.value = value;
            self.status = 'fulfilled'
        }
    }
    function reject(reason) {
        if (self.status = 'pending') {
            self.reason = reason;
            self.status = 'rejected'
        }
    }
    executor(resolve, reject)
}

Promise.prototype.then = function(onfulfilled, onrejected) {
    if (self.status === 'fulfilled') {
        onfulfilled(self.value);
    }
    if (self.status === 'rejected') {
        onfulfilled(self.reason);
    }  
}