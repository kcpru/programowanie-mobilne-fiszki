import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '../lib/utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'filled' | 'outlined' | 'text' | 'tonal';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'filled', ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 disabled:pointer-events-none disabled:opacity-50';
    
    const variants = {
      filled: 'bg-primary-600 text-white hover:bg-primary-700 dark:bg-primary-300 dark:text-primary-900 dark:hover:bg-primary-200',
      outlined: 'border border-outline-light dark:border-outline-dark text-primary-600 dark:text-primary-300 hover:bg-primary-50 dark:hover:bg-primary-900/20',
      text: 'text-primary-600 dark:text-primary-300 hover:bg-primary-50 dark:hover:bg-primary-900/20',
      tonal: 'bg-surfaceContainerHighest-light dark:bg-surfaceContainerHighest-dark text-onSurface-light dark:text-onSurface-dark hover:bg-surfaceContainerHighest-light/80 dark:hover:bg-surfaceContainerHighest-dark/80',
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], className)}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';
