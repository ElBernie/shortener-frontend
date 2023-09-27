'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useRef, useState } from 'react';
import style from './style.module.scss';
import { Workspace } from '@/types/types';
import Link from 'next/link';
import { LuChevronDown } from 'react-icons/lu';
import { Oval } from 'react-loader-spinner';
import { getUsersWorkspaces } from '@/helpers';

interface WorkspaceSelectionPanelProps {
	workspaces: Workspace[];
	loading: boolean;
	onClick: () => void;
}
const WorkspaceSelectionPanel = (props: WorkspaceSelectionPanelProps) => {
	const session = useSession();

	const onSelect = (workspace: Workspace) => {
		session.update({ currentWorkspace: workspace });
	};

	return (
		<div className={style.selectionPanel}>
			{props.loading ? (
				<Oval
					height={25}
					width={25}
					color='rgb(76, 138, 116)'
					wrapperClass={style.loader}
					visible={true}
					ariaLabel='loading'
					secondaryColor='rgb(240, 138, 0)'
					strokeWidth={5}
					strokeWidthSecondary={5}
				/>
			) : (
				<ul>
					{props.workspaces.map((workspace) => {
						return (
							<li key={workspace.id} onClick={() => onSelect(workspace)}>
								<Link
									href='/dashboard/workspace'
									onClick={() => props.onClick()}
								>
									{workspace.name}
								</Link>
							</li>
						);
					})}
				</ul>
			)}

			<Link href='/dashboard/workspaces/create'>
				<div className={style.newWorkspaceButton}>Create a new workspace</div>
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
	const [loading, setLoading] = useState(true);
	const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
	const [showWorkspaceSelectionPanel, setShowWorkspaceSelectionPanel] =
		useState<boolean>(false);
	const getWorkspaces = async () => {
		const data = await getUsersWorkspaces();
		setWorkspaces([...data.owned, ...data.member]);
		setLoading(false);
	};

	useEffect(() => {
		if (showWorkspaceSelectionPanel) {
			setLoading(true);
			getWorkspaces();
		}
	}, [showWorkspaceSelectionPanel]);

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
							onClick={() => {
								setLoading(true);
								setShowWorkspaceSelectionPanel((currentState) => !currentState);
							}}
						/>
					</>
				)}
			</div>

			{showWorkspaceSelectionPanel && (
				<WorkspaceSelectionPanel
					workspaces={workspaces}
					loading={loading}
					onClick={() => setShowWorkspaceSelectionPanel(false)}
				/>
			)}
		</div>
	);
};

export default WorkspaceSelector;
