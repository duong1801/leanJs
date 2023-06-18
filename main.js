/** @format */
//1. Pedding
//2. Fulfilled
//3. Rejected

//promise.resovle
//promise.reject
//promise.all

var coursesApi = "http://localhost:3000/courses";
var listCourseBox = document.querySelector("#course-box");

function start() {
	getCourses(renderCourses);
	handleCreateForm();
}

start();

function getCourses(callback) {
	fetch(coursesApi)
		.then(function (response) {
			return response.json();
		})
		.then(callback);
}

function renderCourses(courses) {
	var html = "";
	html = courses.map(function (course) {
		return `
			<li>
				<h4>${course.name}</h4>
				<p>${course.description}</p>
				<button name="btn-delete" data-id = ${course.id}>Xoá</button>
			</li>
		`;
	});
	listCourseBox.innerHTML = html.join("");
}
function handleCreateForm() {
	createBtn = document.querySelector("button");
	createBtn.onclick = function () {
		var name = document.querySelector('input[name="name"]').value;
		var description = document.querySelector('input[name="description"]').value;
		var newCourse = {
			name: name,
			description: description,
		};
		createCourses(newCourse, getCourses);
	};
}
function createCourses(data, callback) {
	var options = {
		method: "POST", // *GET, POST, PUT, DELETE, etc.
		mode: "cors", // no-cors, *cors, same-origin
		cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
		credentials: "same-origin", // include, *same-origin, omit
		headers: {
			"Content-Type": "application/json",
			// 'Content-Type': 'application/x-www-form-urlencoded',
		},
		redirect: "follow", // manual, *follow, error
		referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
		body: JSON.stringify(data), // body data type must match "Content-Type" header
	};
	fetch(coursesApi, options)
		.then(function (response) {
			return response.json();
		})
		.then(callback);
}
