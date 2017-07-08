import React from 'react';
import {mount, ReactWrapper} from 'enzyme';
import {CoursesManagerCreator} from './CoursesManagerCreator.js';


test('CoursesManagerCreator shown when clicked', () => {

	const setModalShown = jest.fn();
	const addButton = mount(<CoursesManagerCreator setModalShown={setModalShown} fieldHandler={() => {}}/>);

	addButton.find('button').first().simulate('click');
	expect(setModalShown.mock.calls[0][0]).toBe(true);
});

it('CoursesManagerCreator hidden when clicked', () => {
	const setModalShown = jest.fn();
	const modalRef = mount(<CoursesManagerCreator modalShown={true} setModalShown={setModalShown} fieldHandler={() => {}}/>).instance().modalRef;
	const modal = new ReactWrapper(modalRef, true);
	modal.find('.close').simulate('click');
	expect(setModalShown.mock.calls[0][0]).toBe(false);
});
