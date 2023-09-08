import { registerLinkHit } from '@/actions/links/registerHit.action';
import validateLinkPassword from '@/actions/validate-password.action';
import { headers } from 'next/headers';
import { notFound, redirect } from 'next/navigation';

const AliasPage = async ({
	params,
	searchParams,
}: {
	params: { alias: string };
	searchParams?: {
		[key: string]: string | string[] | undefined;
	};
}) => {
	const linkRequest = await fetch(
		`${process.env.API_URL}/links/alias/${params.alias}`,
		{
			cache: 'no-cache',
		}
	);

	if (!linkRequest.ok) throw new Error('Something went wrong');
	if (linkRequest.status == 404) throw notFound();
	/**@todo better error handling */

	const data = await linkRequest.json();

	const headersList = headers();
	registerLinkHit(data.id, {
		ip: headersList.get('ip'),
		useragent: headersList.get('user-agent'),
		languages: headersList.get('accept-language'),
		referer: headersList.get('referer'),
	});

	if (data.password) {
		return (
			<div>
				Password protected
				<form
					action={async (formData) => {
						'use server';
						validateLinkPassword({
							userInput: formData,
							linkData: data,
							onSuccess: () => redirect(data.URL.url),
							onError: () =>
								redirect(headers().get('next-url') + '/?error=wrong-password'),
						});
					}}
				>
					<input type='password' name='linkPassword' />
					<button type='submit'>Submit</button>
				</form>
				{searchParams?.error && <p>{searchParams.error}</p>}
			</div>
		);
	}
	return redirect(data.URL.url);
};

export default AliasPage;
