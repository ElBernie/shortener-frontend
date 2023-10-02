import { getLinkByAliasAction } from '@/actions/links/getLinkByAlias.action';
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
	const data = await getLinkByAliasAction(params.alias);

	if (!data.URL?.url) {
		return notFound();
	}

	const headersList = headers();
	registerLinkHit(data.id, {
		ip: headersList.get('ip'),
		useragent: headersList.get('user-agent'),
		languages: headersList.get('accept-language'),
		referer: headersList.get('referer'),
	});
	if (!data.password) return redirect(data.URL.url);

	return (
		<div>
			Password protected
			<form
				action={async (formData) => {
					'use server';
					validateLinkPassword({
						userInput: formData,
						linkData: data,
						// we know that data.URL.url is defined because it's verified in above if statement
						onSuccess: () => redirect(data.URL?.url as string),
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
};

export default AliasPage;
