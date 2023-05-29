import { Link } from "react-router-dom";

export const HomePage = () => {
  return (
    <div>
      <div>home page</div>
      <div>
        <Link to="/test">to test page</Link>
      </div>
    </div>
  );
};
