import React from 'react';
import {withState, compose, pure} from 'recompose';
import CoursesManagerCreator from './components/CoursesManagerCreator.js';
import CoursesManagerSearch from './components/CoursesManagerSearch.js';
import CoursesManagerResults from './components/CoursesManagerResults.js';

const enhance = compose(
	withState('query', 'setQuery', 'know'),
	pure
);

export const CoursesManager = ({query, setQuery}) => (
	<div style={{marginTop: '20px'}}>
		<CoursesManagerSearch query={query} setQuery={setQuery}/>
		<CoursesManagerResults query={query}/>
		<CoursesManagerCreator />
	</div>
);

export default enhance(CoursesManager);
