import * as LucideIcons from 'lucide-react';

export const IconRenderer = ({ icon }: { icon: string }) => {
  return LucideIcons[
    icon as keyof typeof LucideIcons
  ] as React.ElementType;
}