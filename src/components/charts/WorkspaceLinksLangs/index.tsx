'use client';
import { getWorkspaceLinksLangs } from '@/actions/workspaces/getWorkspaceLinksLangs.action';
import { randomColor } from '@/helpers/colors.helper';
import { ArcElement, Chart } from 'chart.js';
import { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';

Chart.register(ArcElement);
const WorkspaceLinksLangs = ({ workspaceId }: { workspaceId: string }) => {
	const [loading, setLoading] = useState<boolean>(true);
	const [labels, setLabels] = useState<string[]>([]);
	const [labelsBackground, setLabelsBackground] = useState<string[]>([]);
	const [values, setValues] = useState<number[]>([]);

	const loadData = async () => {
		const langsName = new Intl.DisplayNames(['en'], { type: 'language' });
		const stats = await getWorkspaceLinksLangs(workspaceId, {
			start: '-7d',
			interval: '1d',
		});
		//todo if array empty
		const labelData: Array<{ label: string; color: string }> = stats.map(
			(stat: { lang: string; value: number }) => {
				return {
					label: langsName.of(stat.lang),
					color: randomColor(),
				};
			}
		);
		console.log(labelData);
		setLabels(
			labelData.map((label: { label: string; color: string }) => label.label)
		);

		setLabelsBackground(
			labelData.map((label: { label: string; color: string }) => label.color)
		);
		const values = stats.map(
			(stat: { time: string; value: number }) => stat.value
		);
		setValues(values);

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
							backgroundColor: labelsBackground,
							data: values,
						},
					],
				}}
			/>
		</div>
	);
};

export default WorkspaceLinksLangs;
