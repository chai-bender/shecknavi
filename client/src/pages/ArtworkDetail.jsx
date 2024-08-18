import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_SINGLE_ARTWORK, PLACE_BID } from "../utils/queries";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import "../css/artdetail.css";

export default function ArtworkDetail() {
  const { artworkId } = useParams();
  const navigate = useNavigate(); // Initialize the useNavigate hook
  const { loading, data, refetch } = useQuery(QUERY_SINGLE_ARTWORK, {
    variables: { artworkId },
  });
  const [bidAmount, setBidAmount] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState("");
  const [placeBid] = useMutation(PLACE_BID);

  useEffect(() => {
    if (data?.artwork?.endTime) {
      const endTime = dayjs(data.artwork.endTime);
      console.log("Auction End Time:", endTime.format()); // Log the end time

      const intervalId = setInterval(() => {
        const now = dayjs();
        const diff = endTime.diff(now);

        if (diff <= 0) {
          clearInterval(intervalId);
          setTimeRemaining("Auction has ended.");
        } else {
          const hours = Math.floor(diff / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((diff % (1000 * 60)) / 1000);

          setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`);
          console.log("Time Remaining:", `${hours}h ${minutes}m ${seconds}s`); // Log the time remaining
        }
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;

  const artwork = data?.artwork;

  const handleBid = async () => {
    try {
      await placeBid({
        variables: { artworkId, bidAmount: parseFloat(bidAmount) },
      });
      alert("Bid placed successfully!");
      refetch(); // Refetch the artwork data to show updated highest bid
    } catch (err) {
      alert(err.message);
    }
  };

  return (

    <div className="artwork-detail-container">
      <button id="backBtn" onClick={() => navigate(-1)}>Back</button> {/* Add Back Button */}
      <h1 className="artwork-title">{artwork.title}</h1>
      <img
        className="artwork-image"
        src={artwork.imageUrl}
        alt={artwork.title}
      />
      <p className="artwork-description">{artwork.description}</p>
      <p className="current-bid">
        Current Highest Bid: ${artwork.currentHighestBid}
      </p>
      <p className="auction-end-time">Auction Ends In: {timeRemaining}</p>

      <div className="bid-section">
        <input
          className="bid-input"
          type="number"
          value={bidAmount}
          onChange={(e) => setBidAmount(e.target.value)}
          placeholder="Enter your bid"
        />
        <button className="bid-button" onClick={handleBid}>
          Place Bid
        </button>
      </div>
    </div>
  );
}
