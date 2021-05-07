{/* <template>
  <div>
    {{ message }}
  </div>
</template>
<script>
new Vue({
  data() {
    return {
      message: "hello world",
    };
  },
});
</script> */}

// 我们从源头：new Vue 的地方开始分析。

// 执行 new Vue 时会依次执行以下方法
// 1. Vue.prototype._init(option)
// 2. initState(vm)
// 3. observe(vm._data)
// 4. new Observer(data)

// 5. 调用 walk 方法，遍历 data 中的每一个属性，监听数据的变化。
function walk(obj) {
    const keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i]);
    }
}
  
// 6. 执行 defineProperty 监听数据读取和设置。
function defineReactive(obj, key, val) {
    // 为每个属性创建 Dep（依赖搜集的容器，后文会讲）
    const dep = new Dep();
    // 绑定 get、set
    Object.defineProperty(obj, key, {
        get() {
            const value = val;
            // 如果有 target 标识，则进行依赖搜集
            if (Dep.target) {
                dep.depend();
            }
            return value;
        },
        set(newVal) {
            val = newVal;
            // 修改数据时，通知页面重新渲染
            dep.notify();
        },
    });
}