import {Form, InputGroup, FormControl, Button} from 'react-bootstrap';

const submit = e => {
	e.preventDefault();
	console.log('submitted');
};

export default ({query, setQuery}) => (
	<Form onSubmit={submit}>
		<InputGroup>
			<FormControl type="text" placeholder="Search Term (eg. Biology)" value={query} onChange={e => setQuery(e.target.value)}/>
			<InputGroup.Button>
				<Button bsStyle="primary" type="submit">Search</Button>
			</InputGroup.Button>
		</InputGroup>
	</Form>
);