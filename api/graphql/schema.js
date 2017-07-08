import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers.js';

const typeDefs = `
	type Course {
		id: Int!
		subject: String!
		courseNumber: String!
		description: String!
	}

	input CourseInput {
		subject: String!
		courseNumber: String!
		description: String!
	}

	type Mutation {
		createCourse(course: CourseInput!): Course
		deleteCourse(id: Int): Boolean
	}
	type Query {
		courseById(id: Int): Course
		searchCourseDescription(query: String!): [Course]!
	}
`;


export default makeExecutableSchema({typeDefs, resolvers});