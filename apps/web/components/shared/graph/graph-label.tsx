import React from 'react';

type DotColorPreset = 'secondary' | 'tertiary' | 'accent';

interface GraphLabelProps {
	label: string;
	dotColor: DotColorPreset;
}

const GraphLabel = ({ label, dotColor }: GraphLabelProps) => {
	return (
		<div className="center gap-4">
			<div
				className={`w-2 h-2 rounded-full shadow-none ${
					dotColor === 'secondary'
						? 'bg-secondary'
						: dotColor === 'tertiary'
							? 'bg-tertiary'
							: 'bg-accent'
				}`}
			/>
			<p className="text-base font-medium text-center mb-1">
				{label.toLowerCase()}
			</p>
		</div>
	);
};

export default GraphLabel;
