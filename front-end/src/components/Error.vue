<template>
    <div>
        <div class="detail-block">
            <label>Type</label>: <span class="type">{{ type }}</span>
        </div>
        <div class="detail-block">
            <label>Severity</label>: <span class="severity">{{ severity }}</span>
        </div>
        <div class="detail-block">
            <label>Message</label>: <span class="err-msg">{{ msg }}</span>
        </div>
    </div>
</template>

<script>
export default {
	name: 'Error',
	props: {
		msg: {
			type: String,
			default: 'There has been an error, please refresh the page.',
		},
		severity: {
			type: Number,
			default: 1,
		},
		type: {
			type: String,
			default: 'Error',
			validator: (val) => ['Error', 'Info', 'Warning'].includes(val),
		},
	},
};
</script>

<style lang="scss" scoped>
label {
    font-weight: 700;
}
.detail-block {
    background-color: #2c3e50;
    color: #FFF;
    padding: 10px;
    display: block;
}
</style>
