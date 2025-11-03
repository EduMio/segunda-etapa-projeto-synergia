import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

const UserContext = createContext(null);

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
	const user = useTracker(() => Meteor.user());
	const userId = useTracker(() => Meteor.userId());

	return (
		<UserContext.Provider value={{ user, userId }}>
			{children}
		</UserContext.Provider>
	);
};

UserProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
