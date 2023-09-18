'use client';
import { getWorkspaceLinksLangs } from '@/actions/workspaces/getWorkspaceLinksLangs.action';
import { ArcElement, Chart } from 'chart.js';
import { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';

Chart.register(ArcElement);
const WorkspaceLinksLangs = ({ workspaceId }: { workspaceId: string }) => {
	const [loading, setLoading] = useState<boolean>(true);
	const [labels, setLabels] = useState<string[]>([]);
	const [values, setValues] = useState<number[]>([]);

	const loadData = async () => {
		const langsName = new Intl.DisplayNames(['en'], { type: 'language' });
		const stats = await getWorkspaceLinksLangs(workspaceId, {
			start: '-7d',
			interval: '1d',
		});
		//todo if array empty

		setLabels(
			stats.map((stat: { lang: string; value: number }) =>
				langsName.of(stat.lang)
			)
		);
		setValues(stats.map((stat: { time: string; value: number }) => stat.value));

		setLoading(false);
	};

	useEffect(() => {
		loadData();
	}, []);
	return (
		<div>
			<Pie
				data={{
					labels: labels,

					datasets: [
						{
							backgroundColor: labels.map(
								(label, idx) => `rgba(240,138,5,${1 - idx / labels.length})`
							),
							data: values,
						},
					],
				}}
			/>
		</div>
	);
};

export default WorkspaceLinksLangs;
