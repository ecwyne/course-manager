import React from 'react';
import {mount} from 'enzyme';
import {CoursesManagerCreator, CoursesManagerCreatorModal} from './CoursesManagerCreator.js';


test('CoursesManagerCreator shown when clicked', () => {

	const setModalShown = jest.fn();
	const wrapper = mount(<CoursesManagerCreator setModalShown={setModalShown} fieldHandler={() => {}}/>);

	wrapper.find('button').first().simulate('click');
	expect(setModalShown.mock.calls[0][0]).toBe(true);
});

test('CoursesManagerCreatorModal validates courseNumber', () => {
	const wrapper = mount(<CoursesManagerCreatorModal fields={{subject: 'BIO', courseNumber: '12', description: 'some description'}} fieldHandler={() => () => {}}/>);
	expect(wrapper.find('FormGroup').at(1).prop('validationState')).toBe('error');
	expect(wrapper.find('Button').first().prop('disabled')).toBe(true);
});

test('CoursesManagerCreatorModal requires description', () => {
	const wrapper = mount(<CoursesManagerCreatorModal fields={{subject: 'BIO', courseNumber: '101', description: ''}} fieldHandler={() => () => {}}/>);
	expect(wrapper.find('FormGroup').at(1).prop('validationState')).toBe(null);
	expect(wrapper.find('Button').first().prop('disabled')).toBe(true);
});

test('CoursesManagerCreatorModal enabled with all fields filled', () => {
	const wrapper = mount(<CoursesManagerCreatorModal fields={{subject: 'BIO', courseNumber: '001', description: 'some description'}} fieldHandler={() => () => {}}/>);
	expect(wrapper.find('FormGroup').at(1).prop('validationState')).toBe(null);
	expect(wrapper.find('Button').first().prop('disabled')).toBe(false);
});