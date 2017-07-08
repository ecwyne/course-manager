import {search, insert, del, get, query} from '../data/coursesDb.js';
import {pick} from 'ramda';

const Query = {
	courseById: (root, {id}) => get(id),
	searchCourseDescription: (root, {query: q}) => q.length >= 2 ? search(q) : []
};

const Mutation = {
	createCourse: async (root, {course}) => {
		const duplicates = await query(pick(['subject', 'courseNumber'], course));
		if (duplicates.length){
			return new Error('Duplicate course found');
		} else if (course.courseNumber.length != 3 || !/\d\d\d/.test(course.courseNumber)){
			return new Error('Course Number must be a 3-dight, zero-padded number');
		} else {
			return insert(course);
		}
	},
	deleteCourse: (root, {id}) => del(id)
};

export default {Query, Mutation};