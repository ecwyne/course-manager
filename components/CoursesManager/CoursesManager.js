import React from 'react';
import {gql} from 'react-apollo';
import {withState, compose, pure, withHandlers} from 'recompose';
import CoursesManagerCreator from './components/CoursesManagerCreator.js';
import CoursesManagerSearch from './components/CoursesManagerSearch.js';
import CoursesManagerResults from './components/CoursesManagerResults.js';
import {apolloClient} from '../../api/graphql/apolloClient.js';

const searchQuery = gql`
	query Search($query: String!){
	  searchCourseDescription(query: $query){
	    id
	    subject
	    courseNumber
	    description
	  }
	}
`;

const debounceMs = 500;
let lastRan = 0;

const enhance = compose(
	withState('query', 'setQuery', ''),
	withState('results', 'setResults', []),
	withHandlers({
		runQuery: ({setResults, query}) => q => {
			lastRan = Date.now();
			setTimeout(async () => {
				if (Date.now() - debounceMs >= lastRan){
					console.log('Running query for', q, query);
					const {data} = await apolloClient.query({fetchPolicy: 'network-only', query: searchQuery, variables: {query: q || query}});
					setResults(data.searchCourseDescription);
				}
			}, debounceMs);
		}
	}),
	pure
);

export const CoursesManager = ({query, setQuery, results, runQuery}) => (
	<div style={{marginTop: '20px'}}>
		<CoursesManagerSearch query={query} setQuery={setQuery} runQuery={runQuery}/>
		<CoursesManagerResults arr={results} runQuery={runQuery}/>
		<CoursesManagerCreator runQuery={runQuery}/>
	</div>
);

export default enhance(CoursesManager);
