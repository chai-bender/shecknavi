import { gql } from '@apollo/client';

export const QUERY_PROFILE = gql`
  query Profile($username: String!) {
    user(username: $username) {
      _id
      name
      email
    
      }
  }
`;

export const QUERY_ARTWORK = gql`
query Artworks {
  artworks {
    _id
    currentHighestBid
    bids {
      bidAmount
    }
    description
    startTime
    endTime
    imageUrl
    startingBid
    title
  }
}`

export const QUERY_SINGLE_ARTWORK = gql`
query getArtwork($artworkId: ID!) {
  artwork(artworkId: $artworkId) {
    _id
    title
    imageUrl
    description
    startingBid
    currentHighestBid
    startTime
    endTime
    bids {
      bidAmount
      bidTime
    }
  }
}`;
export const PLACE_BID = gql`
  mutation PlaceBid($artworkId: ID!, $bidAmount: Float!) {
    placeBid(artworkId: $artworkId, bidAmount: $bidAmount) {
      _id
      profileId
      artworkId
      bidAmount
      bidTime
    }
  }
`;