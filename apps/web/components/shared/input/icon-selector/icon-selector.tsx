import { useRef } from 'react';
import { useIconSearch } from '@/hooks/use-icons-search';
import { IconSelectorProps } from '@/types/icon-selector-type';
import { IconDisplay } from './icon-display';
import { IconList } from './icon-list';
import { IconSearch } from './icon-search';

const IconSelector = ({ value, onChange }: IconSelectorProps) => {
    const {
        search,
        setSearch,
        icons,
        selectedIcon,
        setSelectedIcon,
        focusedIndex,
        handleKeyDown,
    } = useIconSearch();

    const inputRef = useRef<HTMLInputElement>(null);

    const handleSelectIcon = (icon: string) => {
        setSelectedIcon(icon);
        setSearch('');
        onChange?.(icon);
    };

    return (
        <>
            <div className="flex items-center gap-2">
                <IconDisplay 
                    icon={selectedIcon || value || ''} 
                    onClick={() => inputRef.current?.focus()} 
                />
                <IconSearch
                    value={search}
                    onChange={setSearch}
                    onKeyDown={handleKeyDown}
                    selectedIcon={selectedIcon}
                    inputRef={inputRef}
                />
            </div>
            <IconList
                icons={icons}
                focusedIndex={focusedIndex}
                onSelectIcon={handleSelectIcon}
            />
        </>
    );
};

export default IconSelector;