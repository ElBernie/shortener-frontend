'use client';

export default function ErrorPage({ error }: { error: Error }) {
	return (
		<div>
			<h1>Ooops...</h1>
			<p>{error.message || 'unknown error'}</p>
		</div>
	);
}
