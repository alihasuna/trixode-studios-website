"use client"

import { cn } from "@/lib/utils"

type FieldErrorProps = { error?: string }

export function FieldError({ error }: FieldErrorProps) {
    if (!error) return null
    return <p className="mt-2 text-xs text-red-400 font-light">{error}</p>
}

type TextFieldProps = {
    id: string
    label: string
    value: string
    onChange: (value: string) => void
    type?: "text" | "email" | "url"
    autoComplete?: string
    placeholder?: string
    error?: string
}

export function TextField({
    id,
    label,
    value,
    onChange,
    type = "text",
    autoComplete,
    placeholder,
    error,
}: TextFieldProps) {
    return (
        <div>
            <label htmlFor={id} className="block text-xs uppercase tracking-[0.2em] text-black/50 dark:text-white/50 mb-3 font-grotesk">
                {label}
            </label>
            <input
                id={id}
                type={type}
                value={value}
                autoComplete={autoComplete}
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)}
                className={cn(
                    "w-full bg-transparent border-b py-3 text-black dark:text-white outline-none transition-colors text-base font-light",
                    error
                        ? "border-red-500/50 focus:border-red-500"
                        : "border-black/10 dark:border-white/10 focus:border-brand-blue"
                )}
            />
            <FieldError error={error} />
        </div>
    )
}

type TextareaFieldProps = {
    id: string
    label: string
    value: string
    onChange: (value: string) => void
    rows?: number
    placeholder?: string
    error?: string
}

export function TextareaField({ id, label, value, onChange, rows = 4, placeholder, error }: TextareaFieldProps) {
    return (
        <div>
            <label htmlFor={id} className="block text-xs uppercase tracking-[0.2em] text-black/50 dark:text-white/50 mb-3 font-grotesk">
                {label}
            </label>
            <textarea
                id={id}
                value={value}
                rows={rows}
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)}
                className={cn(
                    "w-full bg-transparent border rounded-2xl p-4 text-black dark:text-white outline-none transition-colors text-base font-light leading-relaxed resize-none",
                    error
                        ? "border-red-500/50 focus:border-red-500"
                        : "border-black/10 dark:border-white/10 focus:border-brand-blue"
                )}
            />
            <FieldError error={error} />
        </div>
    )
}

type Option = { value: string; label: string; description?: string }

type RadioCardGroupProps = {
    name: string
    label: string
    options: Option[]
    value: string
    onChange: (value: string) => void
    error?: string
    columns?: 1 | 2
}

export function RadioCardGroup({
    name,
    label,
    options,
    value,
    onChange,
    error,
    columns = 1,
}: RadioCardGroupProps) {
    return (
        <div>
            <p className="text-xs uppercase tracking-[0.2em] text-black/50 dark:text-white/50 mb-4 font-grotesk">
                {label}
            </p>
            <div
                className={cn(
                    "grid gap-3",
                    columns === 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"
                )}
                role="radiogroup"
                aria-label={label}
            >
                {options.map((opt) => {
                    const selected = value === opt.value
                    return (
                        <button
                            key={opt.value}
                            type="button"
                            role="radio"
                            aria-checked={selected}
                            onClick={() => onChange(opt.value)}
                            className={cn(
                                "text-left p-5 rounded-2xl border transition-all duration-300 group",
                                selected
                                    ? "border-brand-blue bg-brand-blue/5 dark:bg-brand-blue/10"
                                    : "border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30 bg-black/[0.02] dark:bg-white/[0.02]"
                            )}
                        >
                            <div className="flex items-start gap-3">
                                <span
                                    className={cn(
                                        "mt-1 w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 transition-all",
                                        selected
                                            ? "border-brand-blue"
                                            : "border-black/30 dark:border-white/30 group-hover:border-black/60 dark:group-hover:border-white/60"
                                    )}
                                >
                                    <span
                                        className={cn(
                                            "w-2 h-2 rounded-full bg-brand-blue transition-transform",
                                            selected ? "scale-100" : "scale-0"
                                        )}
                                    />
                                </span>
                                <div className="flex-1 min-w-0">
                                    <p className={cn("text-base font-normal", selected ? "text-black dark:text-white" : "text-black/80 dark:text-white/80")}>
                                        {opt.label}
                                    </p>
                                    {opt.description && (
                                        <p className="text-sm text-black/50 dark:text-white/50 mt-1 font-light leading-relaxed">
                                            {opt.description}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <input type="hidden" name={name} value={selected ? opt.value : ""} />
                        </button>
                    )
                })}
            </div>
            <FieldError error={error} />
        </div>
    )
}

type CheckboxGroupProps = {
    label: string
    helperText?: string
    options: Option[]
    values: string[]
    onToggle: (value: string) => void
    error?: string
    columns?: 1 | 2 | 3
}

export function CheckboxGroup({
    label,
    helperText,
    options,
    values,
    onToggle,
    error,
    columns = 2,
}: CheckboxGroupProps) {
    return (
        <div>
            <p className="text-xs uppercase tracking-[0.2em] text-black/50 dark:text-white/50 mb-2 font-grotesk">
                {label}
            </p>
            {helperText && (
                <p className="text-sm text-black/50 dark:text-white/50 mb-4 font-light">{helperText}</p>
            )}
            <div
                className={cn(
                    "grid gap-3",
                    columns === 3
                        ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                        : columns === 2
                            ? "grid-cols-1 sm:grid-cols-2"
                            : "grid-cols-1"
                )}
            >
                {options.map((opt) => {
                    const selected = values.includes(opt.value)
                    return (
                        <button
                            key={opt.value}
                            type="button"
                            role="checkbox"
                            aria-checked={selected}
                            onClick={() => onToggle(opt.value)}
                            className={cn(
                                "text-left px-4 py-3 rounded-xl border transition-all duration-300 flex items-center gap-3",
                                selected
                                    ? "border-brand-blue bg-brand-blue/5 dark:bg-brand-blue/10"
                                    : "border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30 bg-black/[0.02] dark:bg-white/[0.02]"
                            )}
                        >
                            <span
                                className={cn(
                                    "w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-all",
                                    selected
                                        ? "bg-brand-blue border-brand-blue"
                                        : "border-black/30 dark:border-white/30"
                                )}
                            >
                                {selected && (
                                    <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none">
                                        <path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                )}
                            </span>
                            <span className={cn("text-sm font-light", selected ? "text-black dark:text-white" : "text-black/70 dark:text-white/70")}>
                                {opt.label}
                            </span>
                        </button>
                    )
                })}
            </div>
            <FieldError error={error} />
        </div>
    )
}

type SelectFieldProps = {
    id: string
    label: string
    options: Option[]
    value: string
    onChange: (value: string) => void
    error?: string
    placeholder?: string
}

export function SelectField({
    id,
    label,
    options,
    value,
    onChange,
    error,
    placeholder = "Pick one…",
}: SelectFieldProps) {
    return (
        <div>
            <label htmlFor={id} className="block text-xs uppercase tracking-[0.2em] text-black/50 dark:text-white/50 mb-3 font-grotesk">
                {label}
            </label>
            <select
                id={id}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={cn(
                    "w-full bg-transparent border rounded-xl px-4 py-3 text-black dark:text-white outline-none transition-colors text-base font-light",
                    error
                        ? "border-red-500/50 focus:border-red-500"
                        : "border-black/10 dark:border-white/10 focus:border-brand-blue"
                )}
            >
                <option value="" disabled className="bg-white dark:bg-[#030303]">
                    {placeholder}
                </option>
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value} className="bg-white dark:bg-[#030303]">
                        {opt.label}
                    </option>
                ))}
            </select>
            <FieldError error={error} />
        </div>
    )
}
