'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useRef, useState } from 'react';
import style from './style.module.scss';
import { Workspace } from '@/types/types';
import Link from 'next/link';
import { LuChevronDown } from 'react-icons/lu';

interface WorkspaceSelectionPanelProps {
	workspaces: Workspace[];
}
const WorkspaceSelectionPanel = (props: WorkspaceSelectionPanelProps) => {
	const session = useSession();

	const onSelect = (workspace: Workspace) => {
		session.update({ currentWorkspace: workspace });
	};
	return (
		<div className={style.selectionPanel}>
			<ul>
				{props.workspaces.map((workspace) => {
					return (
						<li key={workspace.id} onClick={() => onSelect(workspace)}>
							<Link href='/dashboard/workspace'>{workspace.name}</Link>
						</li>
					);
				})}
			</ul>
			<Link href='/dashboard/workspaces/create'>
				<div>Create a new workspace</div>
			</Link>
		</div>
	);
};

interface WorkspaceSelectorProps {
	style?: React.CSSProperties;
}

const WorkspaceSelector = (props: WorkspaceSelectorProps) => {
	const session = useSession();
	const ref = useRef<HTMLDivElement>(null);
	const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
	const [showWorkspaceSelectionPanel, setShowWorkspaceSelectionPanel] =
		useState<boolean>(false);
	const getWorkspaces = async () => {
		const request = await fetch('/api/users/me/workspaces');
		const data: { owned: Workspace[]; member: Workspace[] } =
			await request.json();

		setWorkspaces([...data.owned, ...data.member]);
	};

	useEffect(() => {
		getWorkspaces();
	}, []);

	// handle click outside of the component
	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				setShowWorkspaceSelectionPanel(false);
			}
		};
		document.addEventListener('click', handleClick, true);
		return () => {
			document.removeEventListener('click', handleClick, true);
		};
	}, []);

	return (
		<div
			ref={ref}
			className={style.selectorContainer}
			style={props.style}
			onBlur={() => setShowWorkspaceSelectionPanel(false)}
		>
			<div className={style.selectorButton}>
				{session.status === 'loading' ? (
					'Loading...'
				) : (
					<>
						<Link href='/dashboard/workspace'>
							{session.data?.currentWorkspace.name}
						</Link>
						<LuChevronDown
							onClick={() =>
								setShowWorkspaceSelectionPanel((currentState) => !currentState)
							}
						/>
					</>
				)}
			</div>

			{showWorkspaceSelectionPanel && (
				<WorkspaceSelectionPanel workspaces={workspaces} />
			)}
		</div>
	);
};

export default WorkspaceSelector;
