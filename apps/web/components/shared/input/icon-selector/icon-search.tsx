import { IconSearchProps } from '@/types/icon-selector-type';
import TextInput from '../text-input';

export const IconSearch = ({ 
    value, 
    onChange, 
    onKeyDown, 
    selectedIcon, 
    inputRef 
}: IconSearchProps) => (
    <TextInput
        ref={inputRef}
        type="text"
        placeholder={
            selectedIcon
                ? `selected '${selectedIcon.replace('Icon', '')}' icon`
                : 'Search icons...'
        }
        className="flex-1 outline-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
    />
);