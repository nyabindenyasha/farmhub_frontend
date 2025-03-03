import {Button} from '@/components/ui/button'
import {PlusCircle} from 'lucide-react'

interface AddButtonProps {
    onClick: () => void
    label: string
}

export function AddButton({ onClick, label }: AddButtonProps) {
    return (
        <Button onClick={onClick} variant="outline" className="w-full">
            <PlusCircle className="mr-2 h-4 w-4" />
            {label}
        </Button>
    )
}

