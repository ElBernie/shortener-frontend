'use client';

import { createWorkspaceInviteAction } from '@/actions/workspaces/createWorkspaceInvite.action';
import { hasUserPermission } from '@/helpers';
import { useSession } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation';
import { use, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

interface WorkspaceInviteProps {
	email: string;
}
const WorkspaceInvitesSendPage = () => {
	const session = useSession();
	const { register, handleSubmit } = useForm<WorkspaceInviteProps>();

	const [error, setError] = useState(false);
	const [inviteSent, setInviteSent] = useState(false);

	if (
		!session.data?.currentWorkspace.id ||
		session.data.currentWorkspace.type == 'PERSONAL' ||
		!hasUserPermission({
			session: session.data,
			permission: 'workspaceMembersInvite',
		})
	)
		redirect('/dashboard/workspace');

	const sendInvite = handleSubmit(async (data) => {
		try {
			await createWorkspaceInviteAction(
				session?.data?.currentWorkspace.id,
				data.email
			);
			setInviteSent(true);
			return;
		} catch (error) {
			setInviteSent(true);
			setError(true);
		}
	});

	if (inviteSent) {
		if (error) {
			return <div>There was an error sending the invite</div>;
		}
		return <div>Invite sent</div>;
	}

	return (
		<div>
			<h1>Send invite to workspace</h1>
			<form onSubmit={sendInvite}>
				<input type='email' placeholder='Email' {...register('email')} />
				<button type='submit'>Send Invite</button>
			</form>
		</div>
	);
};
export default WorkspaceInvitesSendPage;
