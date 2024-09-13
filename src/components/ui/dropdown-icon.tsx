import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'
import React from 'react'

interface DropdownIconProps extends React.ComponentProps<typeof ChevronDown> {
    condition: boolean;
}

const DropdownIcon = ({ condition, className, ...props }: DropdownIconProps) => {
    return (
        <ChevronDown className={cn(
            condition ? 'rotate-180' : 'rotate-0',
            'transition-transform ease-in-out duration-100',
            className
        )} {...props} />
    )
}

export default DropdownIcon
