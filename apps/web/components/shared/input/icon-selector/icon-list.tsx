import * as LucideIcons from 'lucide-react';
import { Button } from '@hwei/ui/shadcn/button';
import { IconListProps } from '@/types/icon-selector-type';

export const IconList = ({ icons, focusedIndex, onSelectIcon }: IconListProps) => (
    <div className="w-[90%] overflow-auto h-fit ml-12"> 
        {icons.map((icon, index) => {
            const Icon = LucideIcons[icon as keyof typeof LucideIcons] as React.ElementType;
            return (
                <Button
                    variant="ghost"
                    key={icon}
                    className={`flex items-center justify-start gap-2 cursor-pointer rounded-xl px-4 h-10 my-1 w-full ${
                        index === focusedIndex ? 'bg-gray-200' : 'hover:bg-gray-200/50'
                    }`}
                    onClick={() => onSelectIcon(icon)}
                >
                    <Icon size={20} />
                    <span>{icon}</span>
                </Button>
            );
        })}
    </div>
);