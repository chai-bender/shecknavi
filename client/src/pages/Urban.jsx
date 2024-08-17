import NavTabs from "../components/NavTabs";
import "../css/urban.css";
export default function Urban() {
  return (
    <div>
      <NavTabs />
      <h1 className="urbanTitle">Urban Reflections</h1>
      <img class="construction" src="./images/backdrop/remodel.png" alt="construction site" />
    </div>
  );
}
