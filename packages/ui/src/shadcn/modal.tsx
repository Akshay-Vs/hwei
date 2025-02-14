import { PropsWithChildren } from 'react';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from './dialog';

interface ModalProps extends PropsWithChildren {
	title: string;
	description: string;
	isOpen: boolean;
	onClose: () => void;
}

const Modal = ({
	title,
	description,
	isOpen,
	onClose,
	children,
}: ModalProps) => {
	const onChange = (open: boolean) => {
		if (!open) onClose();
	};
	return (
		<Dialog open={isOpen} onOpenChange={onChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription>{description}</DialogDescription>
				</DialogHeader>
				<div>{children}</div>
			</DialogContent>
		</Dialog>
	);
};

export { Modal };
