import { Link } from "react-router-dom";

export const TestPage = () => {
  return (
    <div>
      <div>test page</div>
      <div>
        <Link to="/">to home page</Link>
      </div>
    </div>
  );
};
