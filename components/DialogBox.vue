<template>
	<div class="radio-box">
		<h2>{{ radiaoTitle }}</h2>

		<el-radio-group v-model="radio" size="large">
			<el-radio-button class="pro" value="pro" size="default" label="正式" />
			<el-radio-button class="dev" value="dev" size="default" label="测试" />
		</el-radio-group>
	</div>

	<el-button color="#626aef" class="copy-current-page" type="primary">复制当前链接</el-button>
	<el-button color="#626aef" class="generate-url-qrcode" type="primary">生成URL & QRCode</el-button>
	<el-button color="#626aef" class="get-pd-id" type="primary">获取产品ID</el-button>
	<el-button color="#626aef" class="open-home" type="primary">打开首页</el-button>
	<el-button color="#626aef" class="open-env" type="primary">打开配置</el-button>
	<el-button color="#626aef" class="open-back-file" type="primary">打开后台文件</el-button>
	<el-button color="#626aef" class="open-back-page" type="primary">打开后台页面</el-button>
	<el-button color="#626aef" class="open-back-product" type="primary">打开后台产品</el-button>
</template>

<script lang="ts" setup>
	import { ref } from "vue";

	defineProps({
		msg: String,
	});

	const radiaoTitle = ref("请选择Shopify环境:");
	const radio = ref("pro");
	</script>

<style lang="scss">
.radio-box {
	.el-radio-button__inner {
		width: 100%;
	}

	.el-radio-button.is-active .el-radio-button__inner {
		background-color: #626aef !important;
	}
}
</style>

<style lang="scss" scoped>
.radio-box {
	margin-bottom: 4px;

	h2 {
		font-size: 14px;
		padding: 0;
		margin: 0 0 8px 0;
	}

	.el-radio-group {
		width: 100%;

		.el-radio-button {
			width: 50%;
		}
	}
}

.copy-current-page,
.copy-some-page,
.generate-url-qrcode,
.open-home,
.open-back-file,
.open-back-page,
.open-back-product,
.get-pd-id,
.open-env {
	width: 100%;
	margin: 4px 0;
}
</style>
