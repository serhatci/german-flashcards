import "./form.css";
import { useField } from "formik";

const Input = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  const getStyle = () => {
    if (!meta.touched) {
      return "";
    } else if (meta.touched && meta.error) {
      return "input-error";
    } else {
      return "input-success";
    }
  };

  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>{" "}
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
      <input className={getStyle()} {...field} {...props} />
    </>
  );
};

export default Input;
