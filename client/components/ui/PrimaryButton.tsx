'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';

export interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  loadingText?: string;
  trailingIcon?: React.ReactNode;
  leadingIcon?: React.ReactNode;
  fullWidth?: boolean;
  variant?: 'primary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

const PrimaryButton = React.forwardRef<HTMLButtonElement, PrimaryButtonProps>(
  (
    {
      children,
      loading = false,
      loadingText,
      trailingIcon,
      leadingIcon,
      fullWidth = true,
      variant = 'primary',
      size = 'md',
      disabled,
      ...rest
    },
    ref,
  ) => {
    const isDisabled = disabled || loading;

    // ── Size classes ──
    const sizeClasses = {
      sm: 'px-[18px] py-[9px] text-[12px] gap-[7px] rounded-[10px]',
      md: 'px-[24px] py-[13px] text-[13px] gap-[10px] rounded-[12px]',
      lg: 'px-[30px] py-[16px] text-[15px] gap-[12px] rounded-[14px]',
    };

    // ── Variant classes ──
    const variantClasses = {
      primary: isDisabled
        ? 'bg-[rgba(74,47,122,0.2)] text-[rgba(74,47,122,0.45)] shadow-none'
        : 'bg-gradient-to-br from-[var(--violet)] to-[var(--mid)] text-white shadow-[0_4px_18px_rgba(74,47,122,0.28)] hover:brightness-110',

      ghost: isDisabled
        ? 'bg-white/50 text-[rgba(15,11,30,0.3)]'
        : 'bg-white/85 text-[var(--ink)] border border-[rgba(107,79,160,0.25)] hover:brightness-95',

      danger: isDisabled
        ? 'bg-[rgba(192,115,122,0.2)] text-[rgba(192,115,122,0.5)]'
        : 'bg-gradient-to-br from-[#b94a52] to-[#c0737a] text-white shadow-[0_4px_18px_rgba(192,115,122,0.3)] hover:brightness-105',
    };

    const baseClasses = `
      inline-flex items-center justify-center
      font-medium tracking-[0.03em]
      transition-all duration-200
      ${sizeClasses[size]}
      ${variantClasses[variant]}
      ${fullWidth ? 'w-full' : ''}
      ${isDisabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer active:scale-95'}
    `;

    return (
      <button ref={ref} disabled={isDisabled} className={baseClasses} {...rest}>
        {loading ? (
          <>
            <Loader2 className="shrink-0 animate-spin" size={16} />
            {loadingText ?? children}
          </>
        ) : (
          <>
            {leadingIcon && (
              <span className="flex shrink-0 items-center">{leadingIcon}</span>
            )}

            {children}

            {trailingIcon && (
              <span className="flex shrink-0 items-center">{trailingIcon}</span>
            )}
          </>
        )}
      </button>
    );
  },
);

PrimaryButton.displayName = 'PrimaryButton';

export default PrimaryButton;
