interface IPLookUpData {
	status: string;
	continentCode: string;
	countryCode: string;
	city: string;
	lat: number;
	lon: number;
}
export const IPLookUp = async (ip: string): Promise<IPLookUpData | null> => {
	const request = await fetch(
		`http://ip-api.com/json/${ip}?fields=status,continentCode,countryCode,city,lat,lon`
	);

	if (!request.ok) return null;

	const data = await request.json();
	return data;
};
