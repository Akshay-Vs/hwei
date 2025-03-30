'use client';

import { LoadingSpinner } from '@/components/shared/micro-components/loading-spinner';
import { Connection, Loading } from '@clerk/elements/common';
import { Button } from '@hwei/ui/shadcn/button';
import { cloneElement, isValidElement, ReactElement, useMemo } from 'react';
import { IconBaseProps } from 'react-icons/lib';

export interface GlobalLoading {
	isGlobalLoading: boolean;
}

interface SSOProps extends GlobalLoading {
	provider: 'facebook' | 'google' | 'github';
	tooltip: string;
	icon: ReactElement<IconBaseProps>;
}

const resizeIcon = (icon: ReactElement) => {
	if (isValidElement<IconBaseProps>(icon)) {
		return cloneElement(icon, { size: 20 });
	}
	return icon;
};

const ClerkSSO: React.FC<SSOProps> = ({
	provider,
	tooltip,
	icon,
	isGlobalLoading,
}) => {
	const resizedIcon = useMemo(() => resizeIcon(icon), [icon]);

	return (
		<Connection name={provider} asChild>
			<Button
				disabled={isGlobalLoading}
				className="p-0 w-9 h-9"
				aria-label={tooltip}
				tooltip={tooltip}
				variant="ghost"
			>
				<Loading scope={`provider:${provider}`}>
					{(isLoading) => (isLoading ? <LoadingSpinner /> : resizedIcon)}
				</Loading>
			</Button>
		</Connection>
	);
};

export default ClerkSSO;
