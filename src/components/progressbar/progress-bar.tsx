interface ProgressBarProps {
    label: string
    percentage: number
}

export function ProgressBar({ label, percentage }: ProgressBarProps) {
    return (
        <div className="space-y-2">
            <div className="flex justify-between">
                <span className="text-lg font-medium text-gray-700">{label}</span>
                <span className="text-lg font-medium text-gray-700">{percentage}%</span>
            </div>
            <div className="h-3 w-full rounded-full bg-gray-100">
                <div className="h-full rounded-full bg-[#2ECC71]" style={{ width: `${percentage}%` }} />
            </div>
        </div>
    )
}

