import React from 'react';

type TextInputProps = {
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: React.ReactNode;
  required?: boolean;
};

export default function TextInput({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  icon,
  required,
}: TextInputProps) {
  return (
    <div className="mb-3.5">
      <label className="mb-1.5 block text-[11px] tracking-[0.15em] text-[rgba(15,11,30,0.45)] uppercase">
        {label}
      </label>

      <div className="relative">
        {icon && (
          <div className="text-soft pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2">
            {icon}
          </div>
        )}

        <input
          type={type}
          placeholder={placeholder}
          value={value}
          required={required}
          onChange={onChange}
          className="text-ink focus:border-violet w-full rounded-xl border border-[rgba(107,79,160,0.28)] bg-[rgba(255,255,255,0.75)] px-3.5 py-3.5 pl-10.5 text-[14px] font-light transition-all duration-200 outline-none focus:bg-[rgba(255,255,255,0.95)] focus:shadow-[0_0_0_3px_rgba(74,47,122,0.09)]"
        />
      </div>
    </div>
  );
}
