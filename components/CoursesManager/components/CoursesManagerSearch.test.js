import React from 'react';
import CoursesManagerSearch from './CoursesManagerSearch.js';
import {shallow} from 'enzyme';

test('CoursesManagerSearch updates and runs query', () => {

	const setQuery = jest.fn();
	const runQuery = jest.fn();

	const searchBox = shallow(
		<CoursesManagerSearch query="test query" setQuery={setQuery} runQuery={runQuery}/>
	);

	expect(searchBox.first().props().value).toEqual('test query');

	searchBox.simulate('change', {target: {value: 'biology'}});
	searchBox.simulate('change', {target: {value: 'chemistry'}});

	// calls each function twice
	expect(setQuery.mock.calls.length).toBe(2);
	expect(runQuery.mock.calls.length).toBe(2);
});