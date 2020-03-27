<template>
    <div class="card">
		<!-- Card block title/name -->
        <div class="title">{{ name }}</div>
        <div class="body-block">
			<!-- Main image div for a card -->
            <div class="img-container">
				<!-- Adding some fade-in transition for low-bandwidth consumers -->
				<transition name="fade">
					<img :src="imgUrl" :alt="name" @load="imgLoaded = true" v-show="imgLoaded" class="img" />
				</transition>
            </div>
			<!-- Card details block -->
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
	data() {
		return {
			imgLoaded: false,
		};
	},
};
</script>

<style lang="scss" scoped>
$white: #fff;
$grey-500: #161e2e;
$grey-300: #6b7280;
$grey-200: #e5e7eb;
$background: #2c3e50;

.card {
	transition: 0.3s;
	width: 420px;
	min-height: 400px;
	padding: 0;
	text-align: left;
	margin: auto auto;
	background-color: $white;
	border: 1px solid $grey-200;
	border-radius: .5rem;
}
.img-container {
	float: left;
	width: 200px;
	min-height: 324.2px;
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
	background: $white;
	margin: 1rem;
	padding-bottom: 1rem;
	border-bottom: 1px solid $grey-200;
}
.info-block {
	color: $grey-500;
	margin-bottom: 0.625rem;
	margin-right: 0.25rem;
	label {
		display:block;
		color: $grey-300;
		font-size: .875rem;
	}
}
.body-block {
	padding-top: 0.625rem;
	padding-bottom: 0.625rem;
}
.card:hover {
	box-shadow: 0 3px 4px 0 rgba(0,0,0,.07);
}
.fade-enter-active {
	transition: opacity 3s ease-in-out;
}
.fade-enter-to {
	opacity: 1;
}
.fade-enter {
	opacity: 0;
}
@media screen and (max-width: 480px) {
	.img-container {
		float: none !important;
		margin: 0 auto;
	}

	.card {
		padding: 0;
		width: 100%;
		margin: 0 0 1rem;
		border-radius: 0;
	}

	body {
		padding: 0 !important;
	}

	.info-block {
		margin: 15px;
	}
}
</style>
