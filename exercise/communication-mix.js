// 事件总线 + 状态管理，
// 在vue 的 creatd生命周期里，将各个组件公用的方法注册好，以及定义两个方法对data中的值进行get和set（子组件直接改父组件的data，然后付组件通过props会将改值透传给相应的子组件）。
// 1、事件：通过Vue提供的Api来注册和管理相关事件（vm.$on + vm.$off + vm.$once + vm.$emit）
// 2、状态：vm.$store (vm.$store.getData + vm.$store.setData)

// 使用方法
// 1、根组件的实例化 要使用如下代码
// 注意: 1)先实例化 2)暴露成window.vue_page 3)装载到dom
// import App from './App';
// import './index.less';
// const page = new (Vue.extend(App))();
// window.vue_page = page;
// page.$mount('#app');

// 2、父+子组件 都要混入communicationMix
// import {communicationMix} from 'src/common/vue/util/communication';
// mixins: [communicationMix],

export const getCurrentPage = () => {
    return window.vue_pag;
}

const noop = () => {
    return false;
}

const getPublicFunc = (methods) => {
    Object.keys(methods).filter((item) => {
        return key[0] !== '_';
    })
}

// 含name的组件自动注册事件(页面本身不注册事件)
export const eventBus = {
    on(event, cb) {
        getCurrentPage().$on(`eventBus.${event}`, cb);
    },
    once(event, cb) {
        getCurrentPage().$once(`eventBus.${event}`, cb);
    },
    off(event, cb) {
        getCurrentPage().$off(`eventBus.${event}`, cb);
    },
    emit(event, options = {}, cb = noop) {
        getCurrentPage().$emit(`eventBus.${event}`, options, cb);
    },
    emitWithReturn(event, options = {}) {
        return new Promise((resolve) => {
            getCurrentPage.$emit(`eventBus.${event}`, options, resolve);
        });
    },
}

// store
// 数据是在page层，如果要影响到深层的组件，得把该属性一路透传出来
export const store = {
    getData(arg) {
        let ret;
        const page = getCurrentPage();

        if (Array.isArray(arg)) {
            ret = {};
            arg.forEach(key => {
                ret[key] = getValueByKey(page, key);
            })
        } else {
            ret = getValueByKey(page, key);
        }

        return ret;
    },
    setData(key, value) {
        const page = getCurrentPage();
        if (typeof key === 'object') {
            Object.keys(key).forEach(item => {
                setValueByKey(page, item, key[item]);
            })
        } else {
            setValueByKey(page, key, value);
        }
    },
}

// 字符串的key解析成数组便于按层级读取
const keyToAry = (key) => key
/* eslint-disable no-useless-escape*/
    .replace(/[\[\]]/g, '.')
    .split('.')
    .filter((item) => item);

// 通过key(支持层级格式如:a.b[c][d].e[f])获取值
const getValueByKey = (target, key) => {
    keyToAry(key).reduce((obj, item) => obj[item], target)
};

// 通过key设值
const setValueByKey = (target, key, value) => {
    key = keyToAry(key);
    const lastKey = key.pop();
    target = key.reduce((obj, item) => obj[item], target);
    target[lastKey] = value;
};


// * 提供$bus,$store,$page
export const communicationMix = {
    created() {
        const {methods = {}, name} = this.$options;
        const page = getCurrentPage();
        if (page) {
            if (name) {
                getPublicFunc(methods).forEach((funcName) => {
                    eventBus.on(`${name}.${funcName}`, this[funcName])
                });
            }
            this.$bus = eventBus;
            this.store = store;
            this.$page = page;
        } else {
            this.$bus = eventBus;
            this.$store = store;
        }
    },
    beforeDestroy() {
        // 事件需要销毁
        const {methods = {}, name} = this.$options;
        if (name && this !== getCurrentPage()) {
            getPublicFunc(methods).forEach((funcName) => {
                eventBus.off(`${name}.${funcName}`, this[funcName])
            });
        }
        this.$bus = null;
        this.$store = null;
        this.$page = null;
    }
}


