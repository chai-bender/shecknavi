import { gql } from '@apollo/client';

export const QUERY_PROFILE = gql`
  query Profile($username: String!) {
    user(username: $username) {
      _id
      name
      email
    
      }
    }
  }
`;




