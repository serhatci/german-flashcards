import "./form.css";
import { useField } from "formik";

const Input = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>{" "}
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
      <input
        className={meta.touched && meta.error ? "input-error" : ""}
        {...field}
        {...props}
      />
    </>
  );
};

export default Input;
