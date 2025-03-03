interface CustomStatusProps {
    type: 'active' | 'pending' | 'suspended' | 'terminated';
    text: string;
}

export default function CustomStatus({ type, text }: CustomStatusProps) {
    // Define type-specific styles
    const statusStyles: Record<CustomStatusProps['type'], string> = {
        active: 'bg-green-100 text-green-800',
        pending: 'bg-yellow-100 text-yellow-800',
        suspended: 'bg-red-100 text-red-800',
        terminated: 'bg-gray-100 text-gray-800',
    };

    return (
        <span
            className={`px-2 py-1 rounded-full text-xs ${statusStyles[type]}`}
        >
      {text}
    </span>
    );
}

// Usage example
// export default function App() {
//     return (
//         <div>
//             <CustomStatus type="active" text="Active" />
//             <CustomStatus type="pending" text="Pending Approval" />
//             <CustomStatus type="suspended" text="Suspended" />
//             <CustomStatus type="terminated" text="Terminated" />
//         </div>
//     );
// }
