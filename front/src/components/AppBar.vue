<template>
	<v-app-bar app color="primary" dark flat>
		<!-- This button toggles the color theme between light and dark mode -->
		<v-btn icon @click="toggleDarkMode()">
			<v-icon>mdi-theme-light-dark</v-icon>
		</v-btn>

		<v-spacer></v-spacer>

		<!-- The application title -->
		<v-card-title primary-title>
			Todos App
		</v-card-title>
		<v-spacer></v-spacer>

		<!-- This icon's tooltip is for usage instructions -->
		<v-tooltip bottom>
			<template v-slot:activator="{ on, attrs }">
				<v-icon dark v-bind="attrs" v-on="on" @click="infoDialog = true">
					mdi-help-circle-outline
				</v-icon>
			</template>
			<p>Click a todo to enable editing.</p>
			<p>Double click a todo to delete it.</p>
			<p>Click for further information...</p>
		</v-tooltip>
		<AppInformation :open="infoDialog" @close="infoDialog = false"></AppInformation>
	</v-app-bar>
</template>

<script>
	import AppInformation from "./AppInformation";
	export default {
		data() {
			return {
				infoDialog: false,
			};
		},
		components: {
			AppInformation,
		},
		methods: {
			toggleDarkMode() {
				this.$vuetify.theme.dark = localStorage.darkMode = !(localStorage.darkMode == "true");
			},
		},
	};
</script>

<style></style>>
