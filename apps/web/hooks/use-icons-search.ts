import { useState, useEffect } from 'react';
import { getIcons } from '@/actions/get-icons';

export const useIconSearch = () => {
    const [search, setSearch] = useState('');
    const [icons, setIcons] = useState<string[]>([]);
    const [selectedIcon, setSelectedIcon] = useState('');
    const [focusedIndex, setFocusedIndex] = useState(-1);

    useEffect(() => {
        if (!search) {
            setIcons([]);
            setFocusedIndex(-1);
            return;
        }

        const fetchIcons = async () => {
            const results = await getIcons(search, 6);
            setIcons(results);
            setFocusedIndex(results.length > 0 ? 0 : -1);
        };

        fetchIcons();
    }, [search]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (icons.length === 0) return;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setFocusedIndex((prev) => (prev < icons.length - 1 ? prev + 1 : prev));
                break;
            case 'ArrowUp':
                e.preventDefault();
                setFocusedIndex((prev) => (prev > 0 ? prev - 1 : prev));
                break;
            case 'Enter':
                e.preventDefault();
                if (focusedIndex >= 0 && icons[focusedIndex]) {
                    setSelectedIcon(icons[focusedIndex]);
                    setSearch('');
                }
                break;
            case 'Escape':
                e.preventDefault();
                setSearch('');
                break;
        }
    };

    return {
        search,
        setSearch,
        icons,
        selectedIcon,
        setSelectedIcon,
        focusedIndex,
        handleKeyDown,
    };
};