//This file is responsible for making requests related to todo data to the backend and sending their results to the vuex store.

import routes from "./axiosRoutes";
import axios from "axios";
import errorHandler from "./errorHandler";

export default {
	get_todos(ctx) {
		axios.get(routes.get_todos)
			.then((res) => {
				console.log("Fetched todos successfully");
				ctx.commit("set_todos", res.data);
			})
			.catch((err) => {
				errorHandler(ctx, err);
			});
	},
	insert_todo(ctx, todoName) {
		var postingTodo = {
			name: todoName,
			category: ctx.getters.get_selected_category,
		};

		axios.post(routes.insert_todo, postingTodo)
			.then((response) => {
				console.log(response.status + " - " + response.data.message);

				postingTodo.id = response.data.insertId;
				ctx.commit("add_todo", postingTodo);
			})
			.catch((err) => {
				errorHandler(ctx, err);
			});
	},
	delete_todo(ctx, todo) {
		axios.delete(routes.delete_todo(todo.id))
			.then((response) => {
				console.log(response.status + " - " + response.data.message);
				ctx.commit("delete_todo", todo);
			})
			.catch((err) => {
				errorHandler(ctx, err);
			});
	},
	patch_todo(ctx, todo, key, value) {
		var payload = { key, value };
		if (key) {
			axios.patch(routes.update_todo(todo.id), payload)
				.then((response) => {
					console.log(response.status + " - " + response.data.message);
					ctx.commit("patch_todo", [ctx.getters.get_todo_by_id(todo.id), key, value]);
				})
				.catch((err) => {
					errorHandler(ctx, err);
				});
		}
	},
	delete_done_todos(ctx) {
		axios.delete(routes.delete_done_todos(ctx.getters.get_selected_category))
			.then((response) => {
				console.log(response.status + " - " + response.data.message);
				ctx.dispatch("fetch_todos");
			})
			.catch((err) => {
				errorHandler(ctx, err);
			});
	},

	equalize_all_from_category(ctx, category, changeToDone) {
		axios.patch(routes.check_uncheck_todos_from_category(category), { changeToDone })
			.then((response) => {
				console.log(response.status + " - " + response.data.message);
				ctx.dispatch("fetch_todos");
			})
			.catch((err) => {
				errorHandler(ctx, err);
			});
	},
};
