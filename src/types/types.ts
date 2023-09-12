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
	owner?: User;
	type: 'PERSONAL' | 'PROFESSIONAL';
	deletable: boolean;
	createdAt: Date;
	updatedAt: Date;
	WorkspaceMembers?: any[];
	permissions?: typeof WORKSPACE_PERMISSIONS;
};

// some parameters like email or password are optionnal, because they're not always sent by the backend
export type User = {
	id: string;
	email?: string;
	password?: string;
	validated: boolean;
	createdAt: Date;
	updated: Date;
	links?: Array<Link>;
	OwnedWorkspaces?: Array<Workspace>;
};
export type Invite = {
	id: string;
	email: string;
	createdAt: Date;
	updatedAt: Date;
	workspaceId: string;
	workspace: Workspace;
};

export type URL = {
	id: string;
	url: string;
	protocol: string;
	pathname: string;
	search?: string;
	hash?: string;
	hits: number;
	createdAt: Date;
	updatedAt: Date;
	host: string;
	Domain?: Array<Domain>;
};

export type LinkStats = {
	visits?: number;
};
export type Link = {
	id: string;
	alias: string;
	createdAt: Date;
	updatedAt: Date;
	password?: string;
	hits: number;
	userid?: string;
	workspaceId: string;
	URLId: string;
	host: string;
	URL?: URL;
	Domain?: Domain;
	stats?: LinkStats;
};

export type Domain = {
	host: string;
	banned: boolean;
	ageRestricted: boolean;
	hits: number;
	createdAt: Date;
	updatedAt: Date;

	links?: Array<Link>;
	URL?: Array<URL>;
};
