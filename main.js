/** @format */
//1. Pedding
//2. Fulfilled
//3. Rejected

//promise.resovle
//promise.reject
//promise.all

var coursesApi = "http://localhost:3000/courses";
var listCourseBox = document.querySelector("#course-box");
var inputName = document.querySelector('input[name="name"]');
var inputDesc = document.querySelector('input[name="description"]');
function start() {
	getCourses(renderCourses);
	handleCreateForm();
}

start();

function resetForm() {
	inputName.value = "";
	inputDesc.value = "";
}

function getDataForm() {
	var name = document.querySelector('input[name="name"]').value;
	var description = document.querySelector('input[name="description"]').value;
	return {
		name: name,
		description: description,
	};
}

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
			<li class= "course-item-${course.id}">
				<h4>${course.name}</h4>
				<p>${course.description}</p>
				<button onclick="handleDeleteCourse(${course.id})">Xoá</button>
				<button onclick="handleUpdateCourse(${course.id})">Sửa</button>
			</li>
		`;
	});
	listCourseBox.innerHTML = html.join("");
}
function handleCreateForm() {
	createBtn = document.querySelector("button");
	createBtn.onclick = function () {
		// console.log(newCourse);
		var data = getDataForm();
		createCourses(data, function () {
			getCourses(renderCourses);
			resetForm();
		});
	};
}
function createCourses(data, callback) {
	var options = {
		method: "POST", // *GET, POST, PUT, DELETE, etc.
		headers: {
			"Content-Type": "application/json",
			// 'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: JSON.stringify(data), // body data type must match "Content-Type" header
	};
	fetch(coursesApi, options)
		.then(function (response) {
			return response.json();
		})
		.then(callback);
}

function deleteCourse(id) {
	var options = {
		method: "DELETE", // *GET, POST, PUT, DELETE, etc.
		headers: {
			"Content-Type": "application/json",
			// 'Content-Type': 'application/x-www-form-urlencoded',
		},
	};
	fetch(`${coursesApi}/${id}`, options)
		.then(function (response) {
			return response.json();
		})
		.then(function () {
			var courseItem = document.querySelector(".course-item-" + id);
			courseItem.remove();
		});
}
function handleDeleteCourse(id) {
	deleteCourse(id);
}

function handleUpdateCourse(id) {
	var name = document.querySelector(`li.course-item-${id} h4`).innerText;
	var description = document.querySelector(`li.course-item-${id} p`).innerText;
	inputName.value = name;
	inputDesc.value = description;
	createBtn = document.querySelector("button[name='createCourse']");
	updateBtn = document.querySelector("button[name='updateCourse']");
	createBtn.style.display = "none";
	updateBtn.style.display = "block";
	updateBtn.onclick = function () {
		var data = getDataForm();
		updateCourse(id, data);
	};
}
function updateCourse(id, data) {
	var options = {
		method: "PUT", // *GET, POST, PUT, DELETE, etc.
		headers: {
			"Content-Type": "application/json",
			// 'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: JSON.stringify(data), // body data type must match "Content-Type" header
	};
	fetch(`${coursesApi}/${id}`, options)
		.then(function (response) {
			return response.json();
		})
		.then(function () {
			getCourses(renderCourses);
			resetForm();
		});
}
