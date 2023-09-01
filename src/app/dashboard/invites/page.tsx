'use client';
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
		const actionRequest = await fetch(`/api/users/me/invites/${inviteId}`, {
			method: 'POST',
			body: JSON.stringify({ action }),
		});

		setLoading(false);
		if (!actionRequest.ok) {
			onError?.(actionRequest.statusText);
			return;
		}

		setActionDone(true);
		onAction?.(action);
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
			const invitesRequest = await fetch('/api/users/me/invites');
			/**
			 * @todo better error handling
			 */
			if (!invitesRequest.ok) setLoadingState('error');

			const invites: Invite[] = await invitesRequest.json();
			setInvites(invites);
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
