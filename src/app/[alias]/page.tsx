import { notFound, redirect } from 'next/navigation';
const AliasPage = async ({ params }: { params: { alias: string } }) => {
	const data = await fetch(`${process.env.API_URL}/links/${params.alias}`, {
		cache: 'no-cache',
	});

	if (data.status == 404) throw notFound();
	/**@todo better error handling */
	if (data.status != 200) throw new Error('Something went wrong');

	const json = await data.json();
	return redirect(json.URL.url);
};

export default AliasPage;
