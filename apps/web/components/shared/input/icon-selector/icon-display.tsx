import * as LucideIcons from 'lucide-react';
import { Button } from '@hwei/ui/shadcn/button';
import { IconDisplayProps } from '@/types/icon-selector-type';

export const IconDisplay = ({ icon, onClick }: IconDisplayProps) => {
    const IconComponent = LucideIcons[icon as keyof typeof LucideIcons] as React.ElementType;
    
    return (
        <Button
            variant="ghost"
            type="button"
            tooltip={icon || 'Store Icon'}
            className="flex flex-col items-center bg-slate-100/50 border border-accent p-2 h-[3.25rem] w-14 center rounded-xl"
            onClick={onClick}
            tabIndex={-1}
        >
            <IconComponent className="h-6 w-6" />
        </Button>
    );
};