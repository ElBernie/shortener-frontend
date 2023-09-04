export const queryBuilder = (queryParams: {
	[key: string]:
		| undefined
		| boolean
		| string
		| number
		| boolean[]
		| string[]
		| number[];
}) => {
	const mappedQueryParams = Object.entries(queryParams).map((param) => {
		if (param[1] == undefined) return null;
		if (typeof param[1] == 'string' || typeof param[1] == 'number')
			return `${param[0]}=${param[1]}`;
		if (Array.isArray(param[1])) {
			return `${param[0]}=${(param[1] as unknown as number[]).join(',')}`;
		}
	});

	return mappedQueryParams.length > 0 ? `?${mappedQueryParams.join('&')}` : '';
};
