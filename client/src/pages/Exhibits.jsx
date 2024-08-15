import NavTabs from "../components/NavTabs";
import { Link } from "react-router-dom";
import "../css/exhibits.css";

export default function Exhibits() {
  return (
    <div>
      <NavTabs />
      <h1 className="snippet">"Art For Your Soul"</h1>
      <img
        className="exhibitImg"
        src="./images/backdrop/exhibit.jpeg"
        alt="quiet art gallery"
      />
      <h2 className="exhibitTitle">Exhibits</h2>

      <div className="flex-container">
        <div>
          <Link to="/Ethereal">Ethereal Dream</Link>
        </div>
        <div>
          <Link to="/Nature">Nature's Gambit</Link>
        </div>
        <div>
          <Link to="/Urban">Urban Reflections</Link>
        </div>
      </div>
    </div>
  );
}
