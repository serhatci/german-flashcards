import "./form.css";

const Form = (props) => {
  return (
    <form id={props.id} method={props.method}>
      <fieldset>
        <legend>{props.legend}</legend>
        <ul className="no-bullets">{props.children}</ul>
      </fieldset>
    </form>
  );
};

export default Form;
