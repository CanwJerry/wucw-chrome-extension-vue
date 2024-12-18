<template>
	<div class="radio-box">
		<h2>{{ radiaoTitle }}</h2>

		<el-radio-group v-model="currentEnv" size="large">
			<el-radio-button class="pro" value="pro" size="default" label="正式" />
			<el-radio-button class="dev" value="dev" size="default" label="测试" />
		</el-radio-group>
	</div>

	<el-button @click="handleButtonClick('current_page')" color="#626aef" class="copy-current-page" type="primary">复制当前链接</el-button>
	<el-button @click="handleButtonClick('url_qrcode')" color="#626aef" class="generate-url-qrcode" type="primary">生成URL & QRCode</el-button>
	<el-button @click="handleButtonClick('get_pd_id')" color="#626aef" class="get-pd-id" type="primary">获取产品ID</el-button>
	<el-button @click="handleButtonClick('open_home')" color="#626aef" class="open-home" type="primary">打开首页</el-button>
	<el-button @click="handleButtonClick('open_env')" color="#626aef" class="open-env" type="primary">打开配置</el-button>
	<el-button @click="handleButtonClick('open_back_file')" color="#626aef" class="open-back-file" type="primary">打开后台文件</el-button>
	<el-button @click="handleButtonClick('open_back_page')" color="#626aef" class="open-back-page" type="primary">打开后台页面</el-button>
	<el-button @click="handleButtonClick('open_back_product')" color="#626aef" class="open-back-product" type="primary">打开后台产品</el-button>
</template>

<script lang="ts" setup>
import { ref } from "vue";

defineProps({
	msg: String,
});

const radiaoTitle = ref("请选择Shopify环境:");
const currentEnv = ref("pro");

const handleButtonClick = async (data: string) => {
	try {
		switch (data) {
			case "current_page":
				const response = await browser.runtime.sendMessage({ hello: "world" });
				console.log('😀', { response });
				break;

			// case "url_qrcode":
			// 	await browser.tabs.sendMessage(tab.id, {
			// 		msg: "QRCode",
			// 		data: currentEnv,
			// 	});
			// 	break;

			// case "get_pd_id":
			// 	await browser.tabs.sendMessage(tab.id, {
			// 		msg: "getPdId",
			// 		data: currentEnv,
			// 	});
			// 	break;

			case "open_back_file":
				window.open(
					`https://admin.shopify.com/store/andaseatglobal/content/files?selectedView=all`,
					"_blank"
				);
				break;

			case "open_back_page":
				window.open(
					`https://admin.shopify.com/store/andaseatglobal/pages`,
					"_blank"
				);
				break;

			case "open_back_product":
				window.open(
					`https://admin.shopify.com/store/andaseatglobal/products?selectedView=all`,
					"_blank"
				);
				break;

			case "open_home":
				const env =
					currentEnv.value === "pro"
						? "?key=d3f8ea580ef6dbee2771397f87c1d0adb19203f2c5de85f913e986630e8b4160&preview_theme_id="
						: "?_ab=0&_fd=0&_sc=1&preview_theme_id=127730122811";
				window.open(`https://www.andaseat.com/${env}`, "_blank");
				break;

			case "open_env":
				const themeId =
					currentEnv.value === "pro" ? "127755092027" : "127730122811";
				window.open(
					`https://admin.shopify.com/store/andaseatglobal/themes/${themeId}/editor`,
					"_blank"
				);
				break;
		}
	} catch (error) {
		console.log(error);
	}
};
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
