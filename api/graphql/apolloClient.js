import { ApolloClient, createNetworkInterface } from 'react-apollo';
import R from 'ramda';

const uri = 'http://localhost:3000/graphql';

export const getClient = () => new ApolloClient({
	initialState: {},
	ssrMode: !process.browser,
	dataIdFromObject: R.prop('id'),
	networkInterface: createNetworkInterface({uri})
});

export const apolloClient = getClient();