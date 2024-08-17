import { Link } from 'react-router-dom';

const ArtworkList = ({ artwork }) => {
  if (!artwork.length) {
    return <h3>No Artwork Yet</h3>;
  }

  return (
    <div>
      {artwork &&
        artwork.map((art) => (
          <div key={art._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {art.title} <br />
            </h4>
            <img src={art.imageUrl}></img>
            <div className="card-body bg-light p-2">
              <p>{art.description}</p>
            </div>
            <Link
                className="btn btn-primary btn-block btn-squared"
                to={`/art/${art._id}`}>
                Bid Here
              </Link>
          </div>
        ))}
    </div>
  );
};

export default ArtworkList;
