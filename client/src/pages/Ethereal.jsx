import NavTabs from "../components/NavTabs";
import { useQuery } from '@apollo/client';
import ArtworkList from '../components/ArtworkList';
import { QUERY_ARTWORK } from "../utils/queries";
import "../css/ethereal.css";


export default function Ethereal() {
  const { loading, data } = useQuery(QUERY_ARTWORK);
  const artwork = data?.artworks || [];
    return (
      <div>
        <NavTabs />
        <h1 className="etherealTitle">Ethereal Dream</h1>
        <ArtworkList
          artwork={artwork}
        />
      </div>
    );
  }
  