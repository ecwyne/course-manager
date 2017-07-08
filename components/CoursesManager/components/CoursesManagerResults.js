import React from 'react';
import {gql} from 'react-apollo';
import {Table, Glyphicon, Button, Panel} from 'react-bootstrap';
import {apolloClient} from '../../../api/graphql/apolloClient.js';

const deleteMutation = gql`
	mutation DeleteCourse($id: Int!){
	  deleteCourse(id: $id)
	}
`;


const maybeDelete = (id, cb) => {
	if (process.env.NODE_ENV == 'test'){
		return cb();
	}
	const swal = require('sweetalert2');
	swal({
		title: 'Are you sure?',
		text: 'You won\'t be able to revert this!',
		type: 'warning',
		showCancelButton: true,
		confirmButtonText: 'Yes, delete it!',
		reverseButtons: true,
		showLoaderOnConfirm: true,
		preConfirm: () => apolloClient.mutate({mutation: deleteMutation, variables: {id}, refetchQueries: ['Search']}).then(() => cb())
	}).then(() => {
		swal('Deleted!', 'Course has been deleted',	'success');
	}).catch(swal.noop);
};

export const CoursesManagerResultsRow = ({id, subject, courseNumber, description, cb}) => (
	<tr>
		<td style={{verticalAlign: 'middle'}}>
			<strong>{subject} {courseNumber}:</strong> {description}
		</td>
		<td>
			<Button bsStyle="danger" title="Delete course" onClick={() => maybeDelete(id, cb)}>
				<Glyphicon glyph="trash" />
			</Button>
		</td>
	</tr>
);

export default ({arr = [], runQuery}) => (
	<Panel header={<h3>Course Search Results</h3>}>
		<Table fill bordered hover className="text-center">
			<tbody>
				{arr.map(e => <CoursesManagerResultsRow key={e.id} {...e} cb={runQuery}/>)}
			</tbody>
		</Table>
	</Panel>
);

