require('reify');
const path = require('path');
const {insert} = require('./coursesDb.js');
const fs = require('fs');
const R = require('ramda');

// taken from https://www.rider.edu/academics/academic-support-services/registrar/course-schedule-and-registration-information/open-all-course-lists
const arr = fs.readFileSync(path.resolve(__dirname, './seed-data.csv')).toString().split('\n');

const courses = R.uniq(arr.map(str => {
	const [subject, courseNumber, _, description] = str.split(',');
	return {subject, courseNumber, description};
}));

courses.forEach(insert);