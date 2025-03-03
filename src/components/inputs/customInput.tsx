/* eslint-disable @typescript-eslint/no-explicit-any */
import {useState} from 'react';
import {EyeIcon, EyeSlashIcon} from '@heroicons/react/24/outline';

type Props = {
    label?: string;
    placeholder: string;
    value: any;
    type?: string;
    setValue: (newValue: any) => void;
    error?: string; // Optional prop to display an error message
    className?: string;
    disabled?: boolean;
    optional?: boolean;
    size?: 'small' | 'default'; // Add size prop
};

function PrimaryInput({
                          label,
                          placeholder,
                          value,
                          setValue,
                          type,
                          error,
                          className,
                          disabled,
                          optional,
                          size = 'default', // Default size is 'default'
                      }: Props) {
    const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility

    // Define classes for different sizes
    const inputSizeClass =
        size === 'small' ? 'p-2 text-xs rounded-xl ' : 'p-3 text-base rounded-xl ';
    const labelSize = size === 'small' ? 'text-sm' : 'text-base';

    // Toggle visibility of the password field
    const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

    return (
        <div className={`flex flex-col ${className}`}>
            {label && (
                <p className={`${labelSize} heading-text font-semibold pl-1 pb-2`}>
                    {label} {optional && '(Optional)'}
                </p>
            )}
            <div className="relative w-full">
                {type === 'textarea' ? (
                    <textarea
                        disabled={disabled}
                        rows={5}
                        className={`border ${inputSizeClass} ${
                            error ? 'border-red-400' : 'main-border'
                        } bg-white dark:bg-zinc-900 main-text w-full`}
                        placeholder={placeholder}
                        value={value ?? ''}
                        onChange={(e) => setValue(e.target.value)}
                    />
                ) : (
                    <>
                        <input
                            disabled={disabled}
                            type={
                                type === 'password'
                                    ? showPassword
                                        ? 'text'
                                        : 'password'
                                    : type === 'number'
                                        ? 'number'
                                        : type
                            }
                            className={`border ${inputSizeClass} ${
                                error ? 'border-red-400' : 'main-border'
                            } bg-white dark:bg-zinc-900 main-text w-full pr-10`}
                            placeholder={placeholder}
                            value={value ?? ''}
                            onChange={(e) =>
                                setValue(
                                    type === 'number' ? Number(e.target.value) : e.target.value
                                )
                            } // Convert to number if type is 'number'
                        />
                        {/* Show/Hide password toggle button */}
                        {type === 'password' && (
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute inset-y-0 right-2 flex items-center px-2"
                            >
                                {showPassword ? (
                                    <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                                ) : (
                                    <EyeIcon className="h-5 w-5 text-gray-500" />
                                )}
                            </button>
                        )}
                    </>
                )}
            </div>
            {error && (
                <p className="text-red-500 text-xs mt-1 pl-1 text-end">{error}</p>
            )}
        </div>
    );
}

export default PrimaryInput;