import "./form.css";

// Base component for deriving input elements
const Input = (props) => {
  return (
    <>
      <li>
        <label htmlFor={props.id}>{props.label}: </label>
      </li>
      <li>
        <input type={props.type} id={props.id} name={props.id}></input>
      </li>
    </>
  );
};

export default Input;
