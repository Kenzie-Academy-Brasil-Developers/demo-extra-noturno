import {
  forwardRef,
  ForwardRefRenderFunction,
  InputHTMLAttributes,
} from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  name: string;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { label, error, ...rest },
  ref
) => {
  return (
    <div style={{ width: "30%" }}>
      <label>{label}</label>
      <input ref={ref} type="text" {...rest} />
      {!!error && <span>{error}</span>}
    </div>
  );
};

export const Input = forwardRef(InputBase);
