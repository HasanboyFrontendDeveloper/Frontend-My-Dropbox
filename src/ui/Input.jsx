import './style.css';

const Input = ({name, label, id, icon, type='text', value, setValue}) => {
  return (
    <div className="input_box">
      <input type={type} id={id} className="input-field" name={name} value={value} onChange={setValue} required />
      <label htmlFor={id} className="label">
        {label}
      </label>
      <i className={`${icon} auth-icon`}></i>
    </div>
  );
};

export default Input;
