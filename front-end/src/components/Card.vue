<template>
    <div>
        <img :src="imgUrl" :alt="name" class="img" />
        <h4 class="title">{{ name }}</h4>
        <p class="type">Type: {{ type }}</p>
        <p class="set">Set: {{ setName }}</p>
        <p class="description">Description: {{ description }}</p>
    </div>
</template>

<script>
export default {
	name: 'Card',
	props: {
		imgUrl: {
			type: String,
			default: '',
		},
		name: {
			type: String,
			default: 'N/A',
		},
		type: {
			type: String,
			default: 'N/A',
		},
		setName: {
			type: String,
			default: 'N/A',
		},
		description: {
			type: String,
			default: 'N/A',
		},
	},
};
</script>

<style lang="scss" scoped>
div {
    border: 5px solid black;
    max-width: 300px;
    padding: 10px;
    text-align: left;
    .title {
        text-align: center;
    }
    .img {
        width: 100%;
    }
}
</style>
