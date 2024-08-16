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


