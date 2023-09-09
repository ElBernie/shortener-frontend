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
		const parsedLanguages = languageParser.parse(requestData.languages);
		languagesData = parsedLanguages.length > 0 ? parsedLanguages[0] : undefined;
	}

	fetch(`${process.env.API_URL}/links/${linkId}/stats`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			continentCode: ipData?.continentCode,
			countryCode: ipData?.countryCode,
			city: ipData?.city,
			lat: ipData?.lat,
			lon: ipData?.lon,
			browser: useragentData?.browser.name,
			deviceType: useragentData?.device.type ?? 'desktop',
			device: `${useragentData?.device.vendor} ${useragentData?.device.model}`,
			os: useragentData?.os.name,
			lang: languagesData?.code,
		}),
	});
};
