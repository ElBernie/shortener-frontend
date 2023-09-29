'use client';

import { createWorkspaceAction } from '@/actions/workspaces/createWorkspace.action';
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
		await createWorkspaceAction(data.name);
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
