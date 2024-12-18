<template>
	<section id="chromeToastTips" class="toast" :style="{ 'display': showTips }">
		<span class="close-btn" @click="closeTips">x</span>
		<p class="toast-text">{{ toastTips }}</p>
		<p class="toast-url">{{ toastUrl }}</p>
		<QRcodeCpm :toastUrl="toastUrl"></QRcodeCpm>
	</section>
</template>

<script lang="ts" setup>
	import { ref } from 'vue';
	import QRcodeCpm from "@/components/QRCodeCpm.vue";

	let showTips = ref('block');
	let toastTips = ref('testTips');
	let toastUrl = ref('https://3syd8arkp17mhc1h-58188726331.shopifypreview.com/products/andaseat-kaiser-4-premium-gaming-chair?variant=41910169108539');
	const closeTips = () => {
		showTips.value = 'none';
	};
</script>

<style scoped lang="scss">
#chromeToastTips {
	position: fixed;
	top: 0;
	left: 0;
	z-index: 99999;
	width: 300px;
	min-height: 300px;
	text-align: center;
	color: #fff;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	border-bottom-right-radius: 80px;
	padding: 30px 10px;

	#qrcode {
		width: 180px;
		height: 180px;
		background-color: #fff;
		align-items: center;
		justify-content: center;
		border-radius: 8px;
	}

	.close-btn {
		position: absolute;
		right: 10px;
		top: 10px;
		font-size: 16px;
		width: 20px;
		height: 20px;
		line-height: 20px;
		cursor: pointer;
		transition: transform .4s;
		will-change: scale;
	}

	.close-btn:hover {
		transform: scale(1.1);
	}

	.toast-text,
	.toast-url {
		color: #fff;
		font-size: 14px;
		word-wrap: break-word;
		width: 100%;
		margin-bottom: 8px;
	}
}
</style>