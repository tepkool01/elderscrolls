<template>
    <div class="card">
        <div class="title">{{ name }}</div>
        <div class="body-block">
            <div class="img-container">
                <img :src="imgUrl" :alt="name" class="img" />
            </div>
            <div class="info-container">
                <div class="info-block">
                    <label>Type</label>
                    <span class="type">{{ type }}</span>
                </div>

                <div class="info-block">
                    <label>Set</label>
                    <span class="set">{{ setName }}</span>
                </div>

                <div class="info-block">
                    <label>Text</label>
                    <span class="description">{{ description }}</span>
                </div>
            </div>
        </div>
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
$color_white: #fff;
$color_grey: #e2e2e2;
$background: #2c3e50;

.card {
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    width: 400px;
    min-height: 400px;
    padding: 0;
    text-align: left;
    margin: auto auto;
    background-color: $color_grey;

    .img-container {
        float: left;
        width: 200px;
        position: relative;
        .img {
            max-height: 100%;
            max-width: 100%;
        }
    }
    .title {
        font-size: 1.25rem;
        font-weight: 700;
        text-align: center;
        background: $background;
        color: $color_white;
        padding: 15px;
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    }

    .info-block {
        margin-bottom: 10px;
        label {
            display:block;
            font-weight: 600;
        }
    }

    .body-block {
        padding-top: 10px;
        padding-bottom: 10px;
    }
}
.card:hover {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}
</style>
