import React, { useState } from 'react';
import { useTracker, useSubscribe } from 'meteor/react-meteor-data';
import { TasksCollection } from '../../api/TasksCollection';
import { TaskInterface } from '../components/tasks/TaskInterface';

export const TaskDisplay = () => {
	const [showCompleted, setShowCompleted] = useState(true);
	const [searchTerm, setSearchTerm] = useState('');
	const [currentPage, setCurrentPage] = useState(0);

	useSubscribe('tasksWithPrivacy');

	const tasks = useTracker(() => {
		let query = {};

		if (showCompleted) {
			query = {};
		} else {
			query = { state: { $ne: 'Concluída' } };
		}

		if (searchTerm) {
			query = {
				...query,
				name: { $regex: searchTerm, $options: 'i' },
			};
		}

		const tasksPerPage = 4;
		const skip = currentPage * tasksPerPage;
		
		return TasksCollection.find(query, { 
			sort: { createdAt: -1 },
			skip: skip,
			limit: tasksPerPage 
		}).fetch();
	});

	const toggleFilter = () => {
		setShowCompleted(!showCompleted);
	};

	const handleSearch = term => {
		setSearchTerm(term);
		setCurrentPage(0);
	};

	const handlePageChange = page => {
		setCurrentPage(page);
	};

	const totalTasks = useTracker(() => {
		let query = {};

		if (showCompleted) {
			query = { };
		} else {
			query = {  state: { $ne: 'Concluída' } };
		}

		if (searchTerm) {
			query = {
				...query,
				name: { $regex: searchTerm, $options: 'i' },
			};
		}

		return TasksCollection.find(query).count();
	});

	const tasksPerPage = 4;
	const totalPages = Math.ceil(totalTasks / tasksPerPage);

	return (
		<TaskInterface
			tasks={tasks}
			toggleFilter={toggleFilter}
			showCompleted={showCompleted}
			onSearch={handleSearch}
			currentPage={currentPage}
			totalPages={totalPages}
			onPageChange={handlePageChange}
		/>
	);
};