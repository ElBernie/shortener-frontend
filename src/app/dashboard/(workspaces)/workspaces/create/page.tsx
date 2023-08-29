'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { useForm } from 'react-hook-form';

interface WorkspaceCreateForm {
	name: string;
}
const WorkspaceCreatePage = () => {
	const session = useSession();
	const router = useRouter();
	const { register, handleSubmit } = useForm<WorkspaceCreateForm>();
	const createWorkspace = handleSubmit(async (data: WorkspaceCreateForm) => {
		const request = await fetch('/api/workspaces/create', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${session?.data?.user.accessToken}`,
			},
			body: JSON.stringify(data),
		});
		const requestData = await request.json();
		router.push('/dashboard/workspaces');
	});
	return (
		<div>
			<h1>Create Workspace</h1>
			<form onSubmit={createWorkspace}>
				<input type='text' {...register('name', { required: true })} />
				<input type='submit' value='Create Workspace' />
			</form>
		</div>
	);
};

export default WorkspaceCreatePage;
