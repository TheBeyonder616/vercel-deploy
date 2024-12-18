import { backgroundContact } from "../component/Assets";
import { useState, useRef } from "react";
import Config from "../component/Config";
import useResizeBackground from "../hooks/useResizeBackGround";

const Contact = () => {
  const parentRef = useRef(null);
  //prettier-ignore
  const [form, setForm] = useState({name: "", email: "", message: "",});
  //prettier-ignore
  const [errors, setErrors] = useState({ name: "", email: "", message:'' });

  const validationRules = {
    name: (name) => /^[a-zA-Z\s]{2,30}$/.test(name),
    email: (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
    message: (message) => /^.{15,}$/.test(message),
  };

  const validate = (id, value) => {
    const errorMessages = {
      name: "Name must be 2-30 letters.",
      email: "Invalid email address.",
      message: "Message must be 15+ characters.",
    };

    return !validationRules[id](value) ? errorMessages[id] : "";
  };

  const handleErrors = (id, value) => {
    switch (id) {
      case "name":
        setErrors((prev) => ({ ...prev, name: validate(id, value) }));
        break;
      case "email":
        setErrors((prev) => ({ ...prev, email: validate(id, value) }));
        break;
      case "message":
        setErrors((prev) => ({ ...prev, message: validate(id, value) }));
        break;
      default:
        break;
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => {
      if (prev[id] === value) return prev;
      return { ...prev, [id]: value };
    });
    handleErrors(id, value);
  };

  const canSubmit = () => {
    const { name, email, message } = form;
    return (
      ![name, email, message].every(Boolean) ||
      Object.values(errors).some((error) => error)
    );
  };

  const displayError = (error = false) => (error ? "label--error" : "");

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, message } = form;
    window.location.href = Config.MAILTO(name, email, message);
    setForm({ name: "", email: "", message: "" });
  };

  const rgb = "rgb(var(--Black) / 0.62)";

  useResizeBackground(parentRef, backgroundContact, rgb);
  return (
    <main className="main main--contact" ref={parentRef}>
      <section className="contact">
        <div className="contact__heading">
          <h1 className="heading-secondary heading--contact">Contact us</h1>
        </div>
        <form className="contact__form" onSubmit={handleSubmit}>
          <label
            htmlFor="name"
            className={`label label--name ${displayError(errors.name)} `}
          >
            <h3 className="heading-third heading--form">Name</h3>
            <input
              type="text"
              id="name"
              className="form__input from--name"
              placeholder="John Smith"
              autoFocus
              aria-required="true"
              aria-label="Enter your name"
              value={form.name}
              onChange={handleInputChange}
            />
            <p className="heading--p heading--error" id="error-message">
              {errors.name}
            </p>
          </label>

          <label
            htmlFor="email"
            className={`label label--email ${displayError(errors.email)}`}
          >
            <h3 className="heading-third heading--form">Email</h3>
            <input
              type="email"
              id="email"
              className="form__input from--email"
              placeholder="johnSmith@example.com"
              aria-required="true"
              aria-label="Enter your email address"
              value={form.email}
              onChange={handleInputChange}
            />
            <p className="heading-p heading--error">{errors.email}</p>
          </label>

          <label
            htmlFor="message"
            className={`label label--message ${displayError(errors.message)}`}
          >
            <h3 className="heading-third heading--form">Message</h3>
            <textarea
              name="message"
              id="message"
              className="form__textarea from--message"
              placeholder="Input your message"
              value={form.message}
              onChange={handleInputChange}
              aria-required="true"
              aria-label="Enter your message"
            ></textarea>
            <p className="heading-p heading--error">{errors.message}</p>
          </label>

          <div className="submit-form">
            <button
              type="submit"
              title={
                canSubmit() ? "Fill in your details" : "Submit your details"
              }
              className="btn btn--submit"
              aria-label="Submit the form"
              disabled={canSubmit()}
            >
              Submit
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default Contact;
