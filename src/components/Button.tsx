import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '../lib/utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'filled' | 'outlined' | 'text' | 'tonal';
  size?: 'sm' | 'md';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'filled', size = 'md', ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 disabled:pointer-events-none disabled:opacity-50';
    
    const variants = {
      filled: 'bg-primary-700 text-white hover:bg-primary-800 dark:bg-primary-300 dark:text-primary-900 dark:hover:bg-primary-200 shadow-sm',
      outlined: 'border border-outline-light dark:border-outline-dark text-primary-700 dark:text-primary-300 hover:bg-primary-50 dark:hover:bg-primary-900/20',
      text: 'text-primary-700 dark:text-primary-300 hover:bg-primary-50 dark:hover:bg-primary-900/20',
      tonal: 'bg-primary-100 dark:bg-surfaceContainerHighest-dark text-primary-900 dark:text-onSurface-dark hover:bg-primary-200 dark:hover:bg-surfaceContainerHighest-dark/80',
    };

    const sizes = {
      md: 'px-6 py-2.5',
      sm: 'px-3 py-1',
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, sizes[size], variants[variant], className)}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';
