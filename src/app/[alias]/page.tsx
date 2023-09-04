import validateLinkPassword from '@/actions/validate-password.action';
import { notFound, redirect } from 'next/navigation';
import { headers } from 'next/headers';

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
