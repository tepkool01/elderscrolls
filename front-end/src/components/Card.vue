<template>
    <div>
        <!-- Image, Name, Text, Set Name, and Type. -->
        <img :src="data.imageUrl" />
        <h4>Name: {{ data.name }}</h4>
        <p>Type: {{ data.type }}</p>
        <p>Set Name: {{ data.set.name }}</p>
        <p>Text: {{ data.text }}</p>
    </div>
</template>

<script>
export default {
	name: 'Card',
	props: {
		data: Object,
	},
};
</script>

<style lang="scss" scoped>
div {
    border: 1px solid black;
    img {
        width: 50%;
    }
}
</style>
