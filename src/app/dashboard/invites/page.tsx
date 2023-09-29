'use client';
import { getWorkspaceInvitesAction } from '@/actions/WorkspaceInvites/getWorkspaceInvites.action';
import { updateWorkspaceInviteAction } from '@/actions/WorkspaceInvites/updateWorkspaceInvite.action';
import { Invite } from '@/types/types';
import { useEffect, useState } from 'react';

interface InviteActionButtonsProps {
	inviteId: string;
	onAction?: (action: 'ACCEPT' | 'REJECT') => void;
	onError?: (error: string) => void;
}
const InviteActionButtons = ({
	inviteId,
	onAction,
	onError,
}: InviteActionButtonsProps) => {
	const [loading, setLoading] = useState(false);
	const [actionDone, setActionDone] = useState(false);

	const action = async (action: 'ACCEPT' | 'REJECT') => {
		setLoading(true);
		try {
			await updateWorkspaceInviteAction(inviteId, {
				action: action,
			});
			setActionDone(true);
			onAction?.(action);
		} catch (error) {
			if (error instanceof Error) onError?.(error.message);
		}
		setLoading(false);
	};

	if (actionDone) return null;
	return (
		<>
			<button disabled={loading} onClick={async () => await action('ACCEPT')}>
				Accept
			</button>
			<button disabled={loading} onClick={async () => await action('REJECT')}>
				Reject
			</button>
		</>
	);
};

const InvitesPage = () => {
	const [invites, setInvites] = useState<Invite[]>([]);
	const [loadingState, setLoadingState] = useState<
		'loading' | 'loaded' | 'error'
	>('loading');

	useEffect(() => {
		const getInvites = async () => {
			try {
				const invites: Invite[] = await getWorkspaceInvitesAction();
				setInvites(invites);
			} catch (error) {
				setLoadingState('error');
			}

			setLoadingState('loaded');
		};
		getInvites();
	}, []);

	if (loadingState === 'loading') return <div>Loading...</div>;
	if (loadingState === 'error') return <div>Error</div>;
	if (invites.length === 0) return <div>No invites</div>;

	return (
		<div>
			Invites Page <br />
			{invites.length === 0 && 'No invites'}
			{invites.length > 0 && (
				<ul>
					{invites.map((invite) => (
						<li key={invite.id}>
							{invite.workspace.name}{' '}
							<InviteActionButtons
								inviteId={invite.id}
								onAction={() =>
									setInvites((currentInvites) =>
										currentInvites.filter(
											(currentInvite) => currentInvite.id !== invite.id
										)
									)
								}
							/>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};
export default InvitesPage;
