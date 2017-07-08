import React from 'react';
import {FormGroup, ControlLabel, FormControl, Modal, Button, HelpBlock, Alert} from 'react-bootstrap';
import {withState, withHandlers, compose} from 'recompose';
import {gql} from 'react-apollo';
import {apolloClient} from '../../../api/graphql/apolloClient.js';
import R, {assoc} from 'ramda';

const enhance = compose(
	withState('modalShown', 'setModalShown', false),
	withState('inFlight', 'setInFlight', false),
	withState('errors', 'setErrors', []),
	withState('fields', 'setFields', {subject: '', courseNumber: '', description: ''}),
	withHandlers({
		fieldHandler: ({setFields, setErrors}) => field => e => {
			setFields(assoc(field, e.target.value));
			setErrors([]);
		}
	})
);

const mutation = gql`
	mutation CreateCourse($course: CourseInput!){
	  createCourse(course: $course){
	    id
	  }
	}
`;

export class CoursesManagerCreator extends React.PureComponent{
	render() {
		const {modalShown, setModalShown, fields = {}, fieldHandler, setInFlight, errors = [], setErrors, runQuery} = this.props;
		const {subject = '', courseNumber = '', description = ''} = fields;
		const courseNumberValidationState = (courseNumber && !/\b\d\d\d\b/.test(courseNumber)) || ![0,3].includes(courseNumber.length) ? 'error' : null;
		const disabled = Boolean(courseNumberValidationState) || Object.values(fields).some(R.equals(''));

		const submit = async () => {
			setInFlight(true);
			try {
				await apolloClient.mutate({mutation, variables: {course: fields}});
				setInFlight(false);
				setModalShown(false);
				runQuery();
			} catch (err){
				setErrors(err.graphQLErrors.map(R.prop('message')));
				console.log({err});
			}
		};
		return (
			<Button block bsStyle="success" onClick={() => setModalShown(true)}>
				Add New Course
				<Modal show={modalShown} onHide={() => setModalShown(false)}>
					<div ref={ref => this.modalRef = ref}>
						<Modal.Header closeButton>
							<Modal.Title>Add New Course</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<FormGroup controlId="subject">
								<ControlLabel>Subject</ControlLabel>
								<FormControl type="text" placeholder="Subject" value={subject} onChange={fieldHandler('subject')}/>
							</FormGroup>
							<FormGroup controlId="courseNumber" validationState={courseNumberValidationState}>
								<ControlLabel>Course Number</ControlLabel>
								<FormControl type="text" placeholder="Course Number" value={courseNumber} onChange={fieldHandler('courseNumber')}/>
								<HelpBlock>Must be a zero-filled three digit number (eg. 033)</HelpBlock>
							</FormGroup>
							<FormGroup controlId="description">
								<ControlLabel>Course Description</ControlLabel>
								<FormControl type="text" placeholder="Course Description" value={description} onChange={fieldHandler('description')}/>
							</FormGroup>
							{errors.map(msg => <Alert key={msg} bsStyle="warning">{msg}</Alert>)}
						</Modal.Body>

						<Modal.Footer>
							<Button bsStyle="primary" onClick={submit} disabled={disabled}>Submit</Button>
						</Modal.Footer>
					</div>
				</Modal>
			</Button>
		);
	}
}

export default enhance(CoursesManagerCreator);