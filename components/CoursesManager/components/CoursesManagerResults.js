import {graphql, gql} from 'react-apollo';
import {Table, Glyphicon, Button, Panel} from 'react-bootstrap';
import {compose, pure, branch, renderComponent, mapProps} from 'recompose';
import {path} from 'ramda';

const data = graphql(gql`
	query Search($query: String!){
	  searchCourseDescription(query: $query){
	    id
	    subject
	    courseNumber
	    description
	  }
	}
`, {
	options: props => ({
		variables: {query: props.query}
	})
});

const Loading = () => <span>Loading...</span>;
const displayLoadingState = branch(path(['data', 'loading']), renderComponent(Loading));

const CoursesManagerResultsRow = ({id, subject, courseNumber, description}) => (
	<tr key={id}>
		<td>
			<strong>{subject} {courseNumber}:</strong> {description}
		</td>
		<td>
			<Button bsStyle="danger" title="Delete course" onClick={() => console.log('clicked', id)}>
				<Glyphicon glyph="trash" />
			</Button>
		</td>
	</tr>
);

const enhance = compose(
	data,
	displayLoadingState,
	mapProps(({data: d}) => ({arr: d.searchCourseDescription})),
	pure
);

export const CoursesManagerResults = ({arr = []}) => (
	<Panel header="Course Search Results">
		<Table responsive bordered hover className="text-center">
			<tbody>
				{arr.map(CoursesManagerResultsRow)}
			</tbody>
		</Table>
	</Panel>
);

export default enhance(CoursesManagerResults);
