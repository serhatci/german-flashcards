import "./form.css";

const FormButton = (props) => {
  return (
    <>
      <li>
        <button type={props.type}>{props.title}</button>
      </li>
    </>
  );
};

export default FormButton;
