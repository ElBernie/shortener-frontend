'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface WorkspaceInviteProps {
	email: string;
}
const WorkspaceInvitesSendPage = () => {
	const session = useSession();
	const router = useRouter();
	const { register, handleSubmit } = useForm<WorkspaceInviteProps>();

	const [error, setError] = useState(false);
	const [inviteSent, setInviteSent] = useState(false);

	if (!session.data?.currentWorkspace.id)
		return router.replace('/dashboard/workspaces');

	const sendInvite = handleSubmit(async (data) => {
		const inviteRequest = await fetch(
			`/api/workspaces/${session.data.currentWorkspace.id}/invites`,
			{
				method: 'POST',
				body: JSON.stringify(data),
			}
		);

		if (!inviteRequest.ok) {
			setInviteSent(true);
			setError(true);
			return;
		}

		setInviteSent(true);
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
