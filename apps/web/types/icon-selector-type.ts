import { IconNode } from 'lucide-react';

export interface IconSelectorProps {
    value?: string;
    onChange?: (value: string) => void;
}

export interface IconDisplayProps {
    icon: string;
    onClick: () => void;
}

export interface IconSearchProps {
    value: string;
    onChange: (value: string) => void;
    onKeyDown: (e: React.KeyboardEvent) => void;
    selectedIcon: string;
    inputRef: React.RefObject<HTMLInputElement | null>
}

export interface IconListProps {
    icons: string[];
    focusedIndex: number;
    onSelectIcon: (icon: string) => void;
}