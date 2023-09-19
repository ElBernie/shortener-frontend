'use client';
import {
	CategoryScale,
	Chart as Chartjs,
	Legend,
	LineElement,
	LinearScale,
	PointElement,
	Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import { getWorkspaceVisits } from '@/actions/workspaces/getWorkspaceVisits.action';

Chartjs.register(
	LineElement,
	Tooltip,

	CategoryScale,
	LinearScale,
	PointElement
);
const WorkspaceLinksVisits = ({ workspaceId }: { workspaceId: string }) => {
	const [loading, setLoading] = useState<boolean>(true);
	const [labels, setLabels] = useState<string[]>([]);
	const [values, setValues] = useState<number[]>([]);

	const loadData = async () => {
		const stats = await getWorkspaceVisits(workspaceId, {
			start: '-7d',
			interval: '1d',
		});
		//todo if array empty
		const label = stats.map((stat: { time: string; value: number }) =>
			new Date(stat.time).toLocaleDateString()
		);
		setLabels(label);
		const values = stats.map(
			(stat: { time: string; value: number }) => stat.value
		);
		setValues(values);

		setLoading(false);
	};

	useEffect(() => {
		loadData();
	}, []);

	if (loading) return <div>loading...</div>;
	return (
		<Line
			options={{
				showLine: true,
			}}
			data={{
				labels: labels,
				datasets: [
					{
						label: 'Visits',
						data: values,
						fill: false,
						backgroundColor: 'rgb(255, 99, 132)',
						borderColor: 'rgba(255, 99, 132, 0.2)',
						tension: 0.35,
						capBezierPoints: true,
					},
				],
			}}
		/>
	);
};

export default WorkspaceLinksVisits;
