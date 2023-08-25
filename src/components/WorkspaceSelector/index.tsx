'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

const WorkspaceSelector = () => {
	const { data: session } = useSession();
	const [workspaces, setWorkspaces] = useState<string[]>([]);
	const getWorkspaces = async () => {
		const request = await fetch('/api/users/me/workspaces');
		const data = await request.json();
		setWorkspaces(data);
	};

	useEffect(() => {
		getWorkspaces();
	}, []);
	return <div>WorkspaceSelector {JSON.stringify(workspaces)}</div>;
};

export default WorkspaceSelector;
