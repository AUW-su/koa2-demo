<template>
    <div style="padding-top: 40px">
        name: {{ fullName }}
        totla: {{ a }}
        age: {{ age }}
        <div @click="change">点击我</div>
    </div> 
</template>
<script>
export default {
    name: 'App',
    data() {
        return {
            array: [1,2,3],
            age: 18,
            firstName: 'san',
            lastName: 'zhang',
            b: 1,
            c: 2,
        };
    },
    computed: {
        fullName() {
            return `${this.firstName} ${this.lastName}`;
        },
        a() {
            return this.b + this.c;
        },
    },
    watch: {
        age(newvalue, oldvalue) {
            this.firstName = 'li';
        },
    },
    methods: {
        change() {
            this.age = 28;
        },
    },
};
</script>