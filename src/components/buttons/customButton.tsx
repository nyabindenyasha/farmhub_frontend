import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    outline?: boolean;
    text: string;
    secondary?: boolean;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    loading?: boolean;
    icon?: any;
}

const PrimaryButton: React.FC<ButtonProps> = ({
                                                  outline = false,
                                                  text,
                                                  secondary = false,
                                                  onClick,
                                                  loading = false,
                                                  icon: Icon,
                                              }) => {
    const backgroundColor = secondary
        ? 'bg-brand-secondary dark:bg-white '
        : 'bg-brand-main  ';
    const textColor = secondary
        ? 'text-white dark:text-zinc-950 '
        : 'text-white ';
    const borderColor = secondary
        ? 'border-brand-secondary '
        : 'border-brand-main ';

    return (
        <button
            onClick={onClick}
            disabled={loading}
            className={`${
                outline
                    ? `bg-white ${textColor} border-2 ${borderColor}`
                    : `${backgroundColor} ${textColor} border ${borderColor}`
            } rounded-xl space-x-2 px-4 py-3 font-medium flex flex-row items-center`}
        >
            {Icon}
            <p className="text-center w-full text-sm">
                {loading ? 'loading... ' : text}
            </p>
        </button>
    );
};

export default PrimaryButton;

