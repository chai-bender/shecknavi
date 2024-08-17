import { gql } from '@apollo/client';

export const ADD_PROFILE = gql`
  mutation addProfile($name: String!, $email: String!, $password: String!) {
    addProfile(name: $name, email: $email, password: $password) {
      token
      profile {
        _id
        name
      }
    }
  }
`;


export const LOGIN_USER = gql`
mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    profile {
      name
      email
    }
    token
  }
}
`;
export const PLACE_BID = gql`
mutation placeBid($artworkId: ID!, $bidAmount: Float!) {
  placeBid(artworkId: $artworkId, bidAmount: $bidAmount) {
    _id
    bidAmount
    bidTime
  }
}
`;
