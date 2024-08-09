import NavTabs from "../components/NavTabs";
import { Link } from "react-router-dom";

export default function Exhibits() {
    return (
      <div>
     <NavTabs />
     <h1>Exhibits</h1>
     <Link to="/Ethereal">Ethereal Dream</Link>
     <Link to="/Nature">Nature's Gambit</Link>
     <Link to="/Urban">Ubran Reflections</Link>
      </div>
    );
  }
  