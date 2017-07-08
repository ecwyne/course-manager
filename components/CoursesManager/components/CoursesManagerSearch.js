import React from 'react';
import {FormControl} from 'react-bootstrap';



export default ({query, setQuery, runQuery}) => {
	const onChange = e => {
		setQuery(e.target.value);
		runQuery(e.target.value);
	};
	return (
		<FormControl type="text" placeholder="Search Term (eg. Biology)" value={query} onChange={onChange}/>
	);
};