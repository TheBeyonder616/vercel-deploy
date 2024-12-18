import { backgroundDonation } from "../component/Assets";
import { useState, useRef, useEffect, useCallback } from "react";
import useResizeBackground from "../hooks/useResizeBackGround";
import Payment from "../component/payment";

const Donation = () => {
  const parentRef = useRef(null);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    amount: "",
    description: "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    amount: "",
    description: "",
  });

  //prettier-ignore
  const validate = useCallback((id, value) =>
   {
    const validationRules = {
      fullName: (name) => /^[a-zA-Z\s]{2,30}$/.test(name),
      email: (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
      amount: (amount) => /^\d+(\.\d+)?$/.test(amount),
      description: (message) => /^.{3,20}$/.test(message),
    };
    const errorMessages = {
      fullName: "Name must be 2-30 letters and spaces.",
      email: "Invalid email address.",
      amount: "Amount must be a valid number.",
      description: "Message must be 3-20 characters.",
    };
    return !validationRules[id](value) ? errorMessages[id] : "";
  }, []);

  //prettier-ignore
  const handleErrors = useCallback((id, value) =>
     {
      switch (id) {
        case "fullName":
          setErrors((prev) => ({ ...prev, fullName: validate(id, value) }));
          break;
        case "email":
          setErrors((prev) => ({ ...prev, email: validate(id, value) }));
          break;
        case "amount":
          setErrors((prev) => ({ ...prev, amount: validate(id, value) }));
          break;
        case "description":
          setErrors((prev) => ({ ...prev, description: validate(id, value) }));
          break;
        default:
          break;
      }
    },
    [setErrors, validate]
  );

  const handleInputChange = useCallback(
    (e) => {
      const { id, value } = e.target;
      setForm((prev) => {
        if (prev[id] === value) return prev;
        return { ...prev, [id]: value };
      });
      handleErrors(id, value);
    },
    [handleErrors, setForm]
  );

  const canSubmit = () => {
    const { fullName, email, amount, description } = form;
    return (
      ![fullName, email, amount, description].every(Boolean) ||
      Object.values(errors).some((error) => error)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { fullName, email, amount, description } = form;

    const paymentConfig = Payment.paymentDetails({
      amount: +amount,
      customerFullName: fullName,
      customerEmail: email,
      paymentDescription: description,
    });

    setForm({ fullName: "", email: "", amount: "", description: "" });
    Payment.initializePayment(window.MonnifySDK, paymentConfig);
  };

  const displayError = (error = false) => (error ? "label--error" : "");

  useEffect(() => {
    const payment = Payment.initializeScript();
    return () => {
      payment();
    };
  }, []);

  const rgb = "rgb(var(--Black) / .5)";
  useResizeBackground(parentRef, backgroundDonation, rgb);
  return (
    <main ref={parentRef} className="main main--donation">
      <section className="donation">
        <div className="form-heading">
          <h1 className="heading-secondary heading--donation"> Donate</h1>
        </div>

        <form className="contact__form" onSubmit={handleSubmit}>
          <label
            htmlFor="fullName"
            className={`label label--name ${displayError(errors.fullName)} `}
          >
            <h3 className="heading-third heading--form">Full Name</h3>
            <input
              className="form__input form--name"
              autoFocus
              type="text"
              name="fullName"
              id="fullName"
              value={form.fullName}
              onChange={handleInputChange}
              aria-required="true"
              aria-label="Enter your full Name"
              placeholder="Enter your full name"
            />
            <p className="heading--p heading--error" id="error-message">
              {errors.fullName}
            </p>
          </label>

          <label
            htmlFor="email"
            className={`label label--name ${displayError(errors.email)} `}
          >
            <h3 className="heading-third heading--form">Email</h3>
            <input
              className="form__input form--email"
              type="email"
              name="email"
              id="email"
              placeholder="example@gmail.com"
              value={form.email}
              onChange={handleInputChange}
              aria-required="true"
              aria-label="Enter your email address"
            />
            <p className="heading--p heading--error" id="error-message">
              {errors.email}
            </p>
          </label>

          <label
            htmlFor="amount"
            className={`label label--name ${displayError(errors.amount)}`}
          >
            <h3 className="heading-third heading--form">Amount</h3>
            <input
              className="form__input form--amount"
              type="number"
              name="amount"
              id="amount"
              value={form.amount}
              onChange={handleInputChange}
              aria-required="true"
              aria-label="Enter your payment amount"
              placeholder="₦1000"
            />
            <p className="heading--p heading--error" id="error-message">
              {errors.amount}
            </p>
          </label>

          <label
            htmlFor="description"
            className={`label label--name ${displayError(errors.description)} `}
          >
            <h3 className="heading-third heading--form">Description</h3>
            <input
              className="form__input form--amount"
              type="text"
              name="description"
              id="description"
              value={form.description}
              onChange={handleInputChange}
              aria-required="true"
              aria-label="Enter your payment description"
              placeholder="listener Donation"
            />
            <p className="heading--p heading--error" id="error-message">
              {errors.description}
            </p>
          </label>

          <div className="donate-btn">
            <button
              type="submit"
              className="btn btn--submit"
              aria-label="Donate to Pidgin radio"
              disabled={canSubmit()}
            >
              Donate
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default Donation;
