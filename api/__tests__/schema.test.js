import {graphql} from 'graphql';
import schema from '../graphql/schema.js';
import {merge} from 'ramda';


const course = {
	subject: 'BIO',
	courseNumber: '101',
	description: 'Introduction to Biology'
};

const insert = `
	mutation CreateCourse($course: CourseInput!){
		createCourse(course: $course){
			id
		}
	}
`;

const del = `
	mutation DeleteCourse($id: Int!){
		deleteCourse(id: $id)
	}
`;

const query = `
	{
	  courseById(id: 1){
	    id
	    subject
	    courseNumber
	    description
	  }
	}
`;

const search = `
	{
	  searchCourseDescription(query: "bio"){
	    id
	  }
	}
`;

const run = (queryDoc, variables) => graphql(schema, queryDoc, null, null, variables);

test('queries the graphql server', async () => {
	let result;

	// initially empty
	result = await run(query);
	expect(result.data.courseById).toBe(null);

	// insert
	result = await run(insert, {course});
	expect(result.data.createCourse.id).toBe(1);

	// query
	result = await run(query);
	expect(result.data.courseById.id).toBe(1);

	// search
	result = await run(search, {course});
	expect(result.data.searchCourseDescription[0].id).toBe(1);

	// insert duplicate
	result = await run(insert, {course});
	expect(result.errors[0].message).toBe('Duplicate course found');

	// insert non-compliant course number
	result = await run(insert, {course: merge(course, {courseNumber: '12'})});
	expect(result.errors[0].message).toBe('Course Number must be a 3-dight, zero-padded number');

	// delete
	result = await run(del, {id: 1});
	expect(result.data.deleteCourse).toBe(true);

	// delete non-existent
	result = await run(del, {id: 1});
	expect(result.data.deleteCourse).toBe(false);

});