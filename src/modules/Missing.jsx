import { Link } from "react-router-dom";
import Btn from "../component/Btn";

const Missing = () => {
  return (
    <main className="main main--missing">
      <section className="missing-content">
        <h1 className="heading-secondary heading--missing">404</h1>
        <p className="heading-p heading--missing">
          Oops! The page you're looking for is missing.
        </p>
        <Link to="/" className="link-missing">
          <button className="button" tabIndex={-1}>
            <Btn content={"Go Back Home"} />
          </button>
        </Link>
      </section>
    </main>
  );
};

export default Missing;
