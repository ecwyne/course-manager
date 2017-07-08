import {FormGroup, ControlLabel, FormControl, Modal, Button, HelpBlock} from 'react-bootstrap';
import {withState, withHandlers, compose} from 'recompose';
import R, {assoc} from 'ramda';

const enhance = compose(
	withState('modalShown', 'setModalShown', false),
	withState('fields', 'setFields', {subject: '', courseNumber: '', description: ''}),
	withHandlers({
		fieldHandler: ({setFields}) => field => e => setFields(assoc(field, e.target.value))
	})
);

export const CoursesManagerCreator = ({modalShown, setModalShown, fields, fieldHandler}) => {
	const {subject, courseNumber, description} = fields;
	const courseNumberValidationState = (courseNumber && !/\b\d\d\d\b/.test(courseNumber)) || ![0,3].includes(courseNumber.length) ? 'error' : null;
	const disabled = Boolean(courseNumberValidationState) || Object.values(fields).some(R.equals(''));
	return (
		<Button block bsStyle="success" onClick={() => setModalShown(true)}>
			Add New Course
			<Modal show={modalShown} onHide={() => setModalShown(false)}>
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
				</Modal.Body>

				<Modal.Footer>
					<Button bsStyle="primary" onClick={() => console.log(fields)} disabled={disabled}>Submit</Button>
				</Modal.Footer>
			</Modal>
		</Button>
	);
};

export default enhance(CoursesManagerCreator);