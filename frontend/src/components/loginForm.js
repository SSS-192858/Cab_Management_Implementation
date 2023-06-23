import { useState } from "react";
import { useLoginFormValidator } from "./loginFormValidator";
import { getCurrentUser, login } from "../services/auth_services";
import { useNavigate } from "react-router-dom";

const LoginForm = ({setCurrentUser, setIsAdmin, setIsCustomer,setIsDriver}) => {
  const [form, setForm] = useState({
    username: "",
    password: ""
  });

  const navigate = useNavigate();

  const [message, setMessage] = useState("");

  const {errors, validateForm} = useLoginFormValidator(form);

  const onUpdateField = e => {
    const nextFormState = {
      ...form,
      [e.target.name]: e.target.value,
    };
    setForm(nextFormState);
  };

  const onSubmitForm = e => {
    setMessage("")
    e.preventDefault();    
    const { isValid } = validateForm({ form, errors, forceTouchErrors: true });
    if (!isValid) return;
    login(form.username, form.password).then(
      response => {

        const user = getCurrentUser()
        setCurrentUser(user)

        if (user && user.user && user.user.roles[0] && user.user.roles[0].name && user.user.roles[0].name === "ADMIN"){
          setIsAdmin(true)
          navigate("/admin")
        }

        if (user && user.user && user.user.roles[0] && user.user.roles[0].name && user.user.roles[0].name === "CUSTOMER"){
          setIsCustomer(true)
          navigate("/customer")
        }

        if (user && user.user && user.user.roles[0] && user.user.roles[0].name && user.user.roles[0].name === "DRIVER"){
          setIsDriver(true)
          navigate("/driver")
        }
        
      },
      error => {
        const resMessage =
        "Invalid username or password"
        setMessage(resMessage)
      }
    )
    
  };

  return (

    <div className="col-md-12">
        <div className="card card-container">
              <img
                src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                alt="profile-img"
                className="profile-img-card"
              />

            <form onSubmit={onSubmitForm}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                    className="form-control"
                    type="text"
                    aria-label="Username"
                    name="username"
                    value={form.username}
                    onChange={onUpdateField}
                    />

                    {errors.username.dirty && errors.username.error ? (
                            <div className="alert alert-danger" role="alert">{errors.username.message}</div>
                            ) : null}
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                    className="form-control"
                    type="password"
                    aria-label="Password field"
                    name="password"
                    value={form.password}
                    onChange={onUpdateField}
                    />

                    {errors.password.dirty && errors.password.error ? (
                            <div className="alert alert-danger" role="alert">{errors.password.message}</div>
                            ) : null}
                </div>
                <div className="form-group">
                    <button className="btn btn-primary btn-block" type="submit">
                    Login
                    </button>
                </div>

                {message ? 
                  <div className="alert alert-danger" role="alert">{message}</div>
                : null}
            </form>
        </div>
    </div>
  );
};

export default LoginForm;