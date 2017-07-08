import path from 'path';
import {head, merge} from 'ramda';

const filename = path.resolve(__dirname, './courses.sqlite');
var sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(filename); // eslint-disable-line
const knex = require('knex')({
	dialect: 'sqlite3',
	connection: {filename}
});

const setup = knex.schema.createTableIfNotExists('courses', table => {
	table.increments('id');
	table.string('subject');
	table.string('courseNumber');
	table.string('description');
});

export const get = async id => {
	await setup;
	const arr = await knex.raw(`SELECT * FROM courses WHERE id = ${id}`);
	return head(arr);
};

export const insert = async course => {
	await setup;
	const [id] = await knex('courses').insert(course, 'id');
	return merge(course, {id});
};

export const del = async id => {
	await setup;
	return await knex.raw(`DELETE FROM courses where id = ${id}`);
};

export const query = async q => {
	await setup;
	return await knex('courses').select().where(q);
};

export const search = async like => {
	await setup;
	return await knex.raw(`SELECT * FROM courses WHERE description LIKE '%${like}%'`);
};
