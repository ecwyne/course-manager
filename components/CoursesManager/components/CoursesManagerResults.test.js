import React from 'react';
import {Button} from 'react-bootstrap';
import CoursesManagerResults, {CoursesManagerResultsRow} from './CoursesManagerResults.js';
import {mount} from 'enzyme';

test('CoursesManagerResults renders table and reruns on delete', () => {

	const runQuery = jest.fn();

	const arr = [
		{id: 1, subject: 'BIO', courseNumber: '101', description: 'Intro to Biological Sciences'},
		{id: 2, subject: 'CHEM', courseNumber: '101', description: 'Intro to Chemistry'},
	];

	const resultsTable = mount(
		<CoursesManagerResults arr={arr} runQuery={runQuery}/>
	);

	expect(resultsTable.find(CoursesManagerResultsRow).length).toBe(2);
	expect(resultsTable.find(CoursesManagerResultsRow).map(e => e.find('td').first().text())).toEqual(['BIO 101: Intro to Biological Sciences', 'CHEM 101: Intro to Chemistry']);

	// calls runQuery after deleting course
	resultsTable.find(Button).first().simulate('click');
	expect(runQuery.mock.calls.length).toBe(1);

});