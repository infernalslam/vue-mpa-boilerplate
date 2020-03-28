<template>
    <button @click="click()"> go </button>
</template>

<script>
export default {
    name: 'button',
    methods: {
        click() {
            window.location = '/error?q=vuejs'
        }
    }
}
</script>
