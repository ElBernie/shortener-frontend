'use client';
import { Invite } from '@/types/types';
import { useEffect, useState } from 'react';
import { set } from 'react-hook-form';

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
			Invites Page <br /> {JSON.stringify(invites)}
		</div>
	);
};
export default InvitesPage;
