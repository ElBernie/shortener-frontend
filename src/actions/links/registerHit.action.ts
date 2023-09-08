import { UAParser } from 'ua-parser-js';
import * as languageParser from 'accept-language-parser';
import { IPLookUp } from '@/helpers/geoip.helper';
export interface HitRequestData {
	ip?: string | null;
	useragent?: string | null;
	languages?: string | null;
	referer: string | null;
}
export const registerLinkHit = async (
	linkId: string,
	requestData: HitRequestData
) => {
	let ipData;
	if (requestData.ip) {
		ipData = await IPLookUp(requestData.ip);
	}

	let useragentData;
	if (requestData.useragent) {
		useragentData = new UAParser(requestData.useragent).getResult();
	}

	let languagesData;
	if (requestData.languages) {
		languagesData = languageParser.parse(requestData.languages)[0];
	}

	fetch(
		`
        ${process.env.API_URL}/links/${linkId}/stats`,
		{
			method: 'POST',
		}
	);

	return;
};
