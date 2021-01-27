import "./form.css";

const SubmitButton = ({ label, ...props }) => {
  return (
    <>
      <button type="submit" className="auth-button">
        Submit
      </button>
    </>
  );
};

export default SubmitButton;
