'use server';

interface ValidateLinkPasswordProps {
	userInput: FormData;
	linkData: any;
	onSuccess: (data: any) => void;
	onError: () => void;
}
const validateLinkPassword = (params: ValidateLinkPasswordProps) => {
	return params.userInput.get('linkPassword') === params.linkData.password
		? params.onSuccess(params.linkData.URL.url)
		: params.onError();
};
export default validateLinkPassword;
