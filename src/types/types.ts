export enum WORKSPACE_PERMISSIONS {
	workspaceEdit = 'workspaceEdit',
	workspaceMembersEdit = 'workspaceMembersEdit',
	workspaceMembersInvite = 'workspaceMembersInvite',
	workspaceMembersRemove = 'workspaceMembersRemove',

	linksView = 'linksView',
	linksViewOwn = 'linksViewOwn',
	linksCreate = 'linksCreate',
	linksEdit = 'linksEdit',
	linksEditOwn = 'linksEditOwn',
	linksDelete = 'linksDelete',
	linksDeleteOwn = 'linksDeleteOwn',
}

export type Workspace = {
	id: string;
	name: string;
	ownerId: string;
	type: 'PERSONAL' | 'PROFESSIONAL';
	deletable: boolean;
	createdAt: Date;
	updatedAt: Date;
	WorkspaceMembers?: any[];
	permissions?: typeof WORKSPACE_PERMISSIONS;
};


export type Invite = {
	id: string;
	email: string;
	createdAt: Date;
	updatedAt: Date;
	workspaceId: string;
	workspace: Workspace;
};
