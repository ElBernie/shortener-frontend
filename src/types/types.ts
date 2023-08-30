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

/**
 * id": "2a9b61d7-0bbb-4835-b31c-ac20559854ca",
        "email": "arroues.bernard+4@gmail.com",
        "createdAt": "2023-08-29T14:15:25.747Z",
        "updatedAt": "2023-08-29T14:15:25.747Z",
        "workspaceId": "c6bd86e4-f981-42b8-93da-bd4eee5e8079",
        "workspace": {
            "id": "c6bd86e4-f981-42b8-93da-bd4eee5e8079",
            "name": "Workspace perso",
            "ownerId": "035dfdb7-f067-45d8-bf81-1a9700d649ca",
            "type": "PERSONAL",
            "deletable": false,
            "createdAt": "2023-08-29T12:18:56.955Z",
            "updatedAt": "2023-08-29T12:18:39.950Z"
        }
    }
 */
export type Invite = {
	id: string;
	email: string;
	createdAt: Date;
	updatedAt: Date;
	workspaceId: string;
	workspace: Workspace;
};
