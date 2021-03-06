// 1、Throttle： 第一个人说了算
// throttle 的中心思想在于：在某段时间内，不管你触发了多少次回调，我都只认第一次，并在计时结束时给予响应。

// fn是我们需要包装的事件回调, delay是每次推迟执行的等待时间
function throttle(fn, delay) {
    // last为上一次触发回调的时间
    let last = 0
    
    // 将throttle处理结果当作函数返回
    return function () {
        // 保留调用时的this上下文
        let context = this
        // 保留调用时传入的参数
        let args = arguments
        // 记录本次触发回调的时间
        let now = +new Date()
        
        // 判断上次触发的时间和本次触发的时间差是否小于时间间隔的阈值
        if (now - last >= delay) {
        // 如果时间间隔大于我们设定的时间间隔阈值，则执行回调
            last = now;
            fn.apply(context, args);
        }
    }
}
  
// 用throttle来包装scroll的回调
document.addEventListener('scroll', throttle(() => console.log('触发了滚动事件'), 10000))

// ******************************

// 2、Debounce： 最后一个人说了算
// 防抖的中心思想在于：我会等你到底。在某段时间内，不管你触发了多少次回调，我都只认最后一次。

// fn是我们需要包装的事件回调, delay是每次推迟执行的等待时间
function debounce(fn, delay) {
    // 定时器
    let timer = null
    
    // 将debounce处理结果当作函数返回
    return function () {
      // 保留调用时的this上下文
      let context = this
      // 保留调用时传入的参数
      let args = arguments
  
      // 每次事件被触发时，都去清除之前的旧定时器
      if(timer) {
          clearTimeout(timer)
      }
      // 设立新定时器
      timer = setTimeout(function () {
        fn.apply(context, args)
      }, delay)
    }
}
  
// 用debounce来包装scroll的回调
const better_scroll = debounce(() => console.log('触发了滚动事件'), 1000)

document.addEventListener('scroll', better_scroll)

// 3、用 Throttle 来优化 Debounce

// debounce 的问题在于它“太有耐心了”。试想，如果用户的操作十分频繁——他每次都不等 debounce 设置的 delay 时间结束就进行下一次操作，于是每次 debounce 都为该用户重新生成定时器，回调函数被延迟了不计其数次。频繁的延迟会导致用户迟迟得不到响应，用户同样会产生“这个页面卡死了”的观感。
// 为了避免弄巧成拙，我们需要借力 throttle 的思想，打造一个“有底线”的 debounce——等你可以，但我有我的原则：delay 时间内，我可以为你重新生成定时器；但只要delay的时间到了，我必须要给用户一个响应。这个 throttle 与 debounce “合体”思路，已经被很多成熟的前端库应用到了它们的加强版 throttle 函数的实现中：

// fn是我们需要包装的事件回调, delay是时间间隔的阈值
function throttle(fn, delay) {
    // last为上一次触发回调的时间, timer是定时器
    let last = 0, timer = null
    // 将throttle处理结果当作函数返回
    
    return function () { 
        // 保留调用时的this上下文
        let context = this
        // 保留调用时传入的参数
        let args = arguments
        // 记录本次触发回调的时间
        let now = +new Date()
      
        // 判断上次触发的时间和本次触发的时间差是否小于时间间隔的阈值
        if (now - last < delay) {
            // 如果时间间隔小于我们设定的时间间隔阈值，则为本次触发操作设立一个新的定时器
            clearTimeout(timer)
            timer = setTimeout(function () {
                last = now
                fn.apply(context, args)
            }, delay)
        } else {
            // 如果时间间隔超出了我们设定的时间间隔阈值，那就不等了，无论如何要反馈给用户一次响应
            last = now
            fn.apply(context, args)
        }
    }
}
  
// 用新的throttle包装scroll的回调
const better_scroll = throttle(() => console.log('触发了滚动事件'), 1000)

document.addEventListener('scroll', better_scroll)



// ********************************* *********************************

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