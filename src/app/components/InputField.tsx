import { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes, useId } from "react";
import { ChevronDown } from "lucide-react";

/* ── Shared label + hint wrapper ── */
interface InputFieldBaseProps {
  /** Field label text */
  label?: string;
  /** Show "(optional)" suffix next to label */
  optional?: boolean;
  /** Hint text below the input */
  hint?: string;
  /** Extra classes on the outermost wrapper */
  wrapperClassName?: string;
}

/* ── Text / date / password input ── */
interface TextInputFieldProps
  extends InputFieldBaseProps,
    Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  as?: "input";
  type?: "text" | "date" | "password" | "email" | "number" | "tel" | "url";
}

/* ── Native select ── */
interface SelectFieldProps
  extends InputFieldBaseProps,
    Omit<SelectHTMLAttributes<HTMLSelectElement>, "className"> {
  as: "select";
  className?: string;
  children: React.ReactNode;
}

/* ── Textarea ── */
interface TextareaFieldProps
  extends InputFieldBaseProps,
    Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "className"> {
  as: "textarea";
  className?: string;
}

export type InputFieldProps = TextInputFieldProps | SelectFieldProps | TextareaFieldProps;

/* ── Shared classes ── */
const inputBaseClass =
  "w-full h-[44px] px-4 rounded-lg border border-[var(--border-default)] bg-[var(--bg-raised)] font-['Inter',sans-serif] text-[length:var(--text-base)] text-[color:var(--text-primary)] outline-none transition-colors focus:border-[var(--indigo-7)] placeholder:text-[var(--text-muted)]";

/* ── Floating label classes ── */
const floatingInputClass =
  "peer relative z-20 w-full h-[56px] px-4 pt-7 pb-1.5 rounded-lg border border-[var(--border-default)] bg-transparent font-['Inter',sans-serif] text-[length:var(--text-base)] text-[color:var(--text-primary)] outline-none transition-colors focus:border-[var(--indigo-7)] placeholder:text-transparent";

const floatingLabelClass =
  "absolute left-4 top-1/2 -translate-y-1/2 font-['Inter',sans-serif] text-[length:var(--text-base)] text-[color:var(--text-muted)] transition-all duration-200 pointer-events-none peer-focus:top-3.5 peer-focus:translate-y-0 peer-focus:text-[length:var(--text-xs)] peer-focus:text-[color:var(--text-secondary)] peer-[:not(:placeholder-shown)]:top-3.5 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-[length:var(--text-xs)] peer-[:not(:placeholder-shown)]:text-[color:var(--text-secondary)]";

export function InputField(props: InputFieldProps) {
  const { label, optional, hint, wrapperClassName = "" } = props;

  /* For text inputs with a label, use the floating label pattern */
  if (props.as !== "select" && props.as !== "textarea" && label) {
    return (
      <div className={`flex flex-col gap-[6px] ${wrapperClassName}`}>
        <FloatingLabelInput {...props} />
        {hint && (
          <p className="font-['Inter',sans-serif] text-[length:var(--text-xs)] text-[color:var(--text-secondary)] leading-[1.3]">
            {hint}
          </p>
        )}
      </div>
    );
  }

  /* For selects with a label, use the floating label pattern */
  if (props.as === "select" && label) {
    return (
      <div className={`flex flex-col gap-[6px] ${wrapperClassName}`}>
        <FloatingLabelSelect {...props} />
        {hint && (
          <p className="font-['Inter',sans-serif] text-[length:var(--text-xs)] text-[color:var(--text-secondary)] leading-[1.3]">
            {hint}
          </p>
        )}
      </div>
    );
  }

  /* For textareas with a label, use the floating label pattern */
  if (props.as === "textarea" && label) {
    return (
      <div className={`flex flex-col gap-[6px] ${wrapperClassName}`}>
        <FloatingLabelTextarea {...props} />
        {hint && (
          <p className="font-['Inter',sans-serif] text-[length:var(--text-xs)] text-[color:var(--text-secondary)] leading-[1.3]">
            {hint}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className={`flex flex-col gap-[6px] ${wrapperClassName}`}>
      {/* Label row (for select / textarea / text inputs without label) */}
      {label && (
        <div className="flex items-center gap-1 leading-[1.3]">
          <label
            className="font-['Inter',sans-serif] text-[length:var(--text-base)] text-[color:var(--text-primary)]"
            style={{ fontWeight: 600 }}
          >
            {label}
          </label>
          {optional && (
            <span className="font-['Inter',sans-serif] text-[length:var(--text-xs)] text-[color:var(--text-secondary)]">
              (optional)
            </span>
          )}
        </div>
      )}

      {/* Control */}
      {props.as === "select" ? (
        <SelectControl {...props} />
      ) : props.as === "textarea" ? (
        <TextareaControl {...props} />
      ) : (
        <TextInputControl {...props} />
      )}

      {/* Hint */}
      {hint && (
        <p className="font-['Inter',sans-serif] text-[length:var(--text-xs)] text-[color:var(--text-secondary)] leading-[1.3]">
          {hint}
        </p>
      )}
    </div>
  );
}

/* ── Floating label text input ── */
function FloatingLabelInput({
  label,
  optional: _opt,
  hint: _hint,
  wrapperClassName: _wc,
  as: _as,
  className = "",
  placeholder: _placeholder,
  type,
  value,
  defaultValue,
  ...rest
}: TextInputFieldProps) {
  const autoId = useId();
  const inputId = `floating-${autoId}`;

  /* Date inputs always show a value, so the label should always be "up" */
  const isAlwaysFilled = type === "date";

  return (
    <div className="relative bg-[var(--bg-raised)] rounded-lg">
      <input
        id={inputId}
        type={type}
        value={value}
        defaultValue={defaultValue}
        placeholder=" "
        className={`${floatingInputClass} ${isAlwaysFilled ? "filled-date" : ""} ${className}`}
        {...rest}
      />
      <label
        htmlFor={inputId}
        className={`${floatingLabelClass}${isAlwaysFilled ? " !top-3.5 !translate-y-0 !text-[length:var(--text-xs)] !text-[color:var(--text-secondary)]" : ""}`}
      >
        {label}
      </label>
    </div>
  );
}

/* ── Floating label select ── */
function FloatingLabelSelect({
  label,
  optional: _opt,
  hint: _hint,
  wrapperClassName: _wc,
  as: _as,
  className = "",
  children,
  ...rest
}: SelectFieldProps) {
  const autoId = useId();
  const inputId = `floating-${autoId}`;

  return (
    <div className="relative bg-[var(--bg-raised)] rounded-lg">
      <select
        id={inputId}
        className={`peer relative z-20 w-full h-[56px] px-4 pt-7 pb-1.5 pr-10 rounded-lg border border-[var(--border-default)] bg-transparent font-['Inter',sans-serif] text-[length:var(--text-base)] text-[color:var(--text-primary)] outline-none transition-colors focus:border-[var(--indigo-7)] appearance-none cursor-pointer ${className}`}
        {...rest}
      >
        {children}
      </select>
      <label
        htmlFor={inputId}
        className="absolute left-4 top-3.5 translate-y-0 font-['Inter',sans-serif] text-[length:var(--text-xs)] text-[color:var(--text-secondary)] pointer-events-none"
      >
        {label}
      </label>
      <ChevronDown
        size={16}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] pointer-events-none z-20"
      />
    </div>
  );
}

/* ── Floating label textarea ── */
function FloatingLabelTextarea({
  label,
  optional: _opt,
  hint: _hint,
  wrapperClassName: _wc,
  as: _as,
  className = "",
  rows = 3,
  value,
  defaultValue,
  ...rest
}: TextareaFieldProps) {
  const autoId = useId();
  const inputId = `floating-${autoId}`;

  const hasValue =
    (typeof value === "string" && value.length > 0) ||
    (typeof defaultValue === "string" && defaultValue.length > 0);

  return (
    <div className="relative bg-[var(--bg-raised)] rounded-lg">
      <textarea
        id={inputId}
        rows={rows}
        value={value}
        defaultValue={defaultValue}
        placeholder=" "
        className={`peer relative z-20 w-full px-4 pt-7 pb-2 rounded-lg border border-[var(--border-default)] bg-transparent font-['Inter',sans-serif] text-[length:var(--text-base)] text-[color:var(--text-primary)] outline-none transition-colors focus:border-[var(--indigo-7)] placeholder:text-transparent resize-y ${className}`}
        {...rest}
      />
      <label
        htmlFor={inputId}
        className={`absolute left-4 font-['Inter',sans-serif] text-[color:var(--text-muted)] transition-all duration-200 pointer-events-none ${
          hasValue
            ? "top-2.5 translate-y-0 text-[length:var(--text-xs)] !text-[color:var(--text-secondary)]"
            : "top-5 -translate-y-1/2 text-[length:var(--text-base)]"
        } peer-focus:top-2.5 peer-focus:translate-y-0 peer-focus:text-[length:var(--text-xs)] peer-focus:text-[color:var(--text-secondary)] peer-[:not(:placeholder-shown)]:top-2.5 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-[length:var(--text-xs)] peer-[:not(:placeholder-shown)]:text-[color:var(--text-secondary)]`}
      >
        {label}
      </label>
    </div>
  );
}

/* ── Plain text input control (no label) ── */
function TextInputControl({
  label: _label,
  optional: _opt,
  hint: _hint,
  wrapperClassName: _wc,
  as: _as,
  className = "",
  ...rest
}: TextInputFieldProps) {
  return (
    <input
      {...rest}
      className={`${inputBaseClass} ${className}`}
    />
  );
}

/* ── Select control (appearance-none + custom chevron) ── */
function SelectControl({
  label: _label,
  optional: _opt,
  hint: _hint,
  wrapperClassName: _wc,
  as: _as,
  className = "",
  children,
  ...rest
}: SelectFieldProps) {
  return (
    <div className="relative">
      <select
        {...rest}
        className={`${inputBaseClass} appearance-none pr-10 cursor-pointer ${className}`}
      >
        {children}
      </select>
      <ChevronDown
        size={16}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] pointer-events-none"
      />
    </div>
  );
}

/* ── Textarea control ── */
function TextareaControl({
  label: _label,
  optional: _opt,
  hint: _hint,
  wrapperClassName: _wc,
  as: _as,
  className = "",
  ...rest
}: TextareaFieldProps) {
  return (
    <textarea
      {...rest}
      className={`w-full min-h-[80px] px-4 py-3 rounded-lg border border-[var(--border-default)] bg-[var(--bg-raised)] font-['Inter',sans-serif] text-[length:var(--text-base)] text-[color:var(--text-primary)] outline-none transition-colors focus:border-[var(--indigo-7)] placeholder:text-[var(--text-muted)] resize-y ${className}`}
    />
  );
}