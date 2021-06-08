import gql from "graphql-tag";

const REGISTER = gql`
  mutation register($user: NewUserInput!){
    register(data: $user){
      username,
      email
    }
  }
`;

const LOGIN = gql`
  mutation login($user: UserInput!){
    loginUser(data: $user){
      username,
      _id
    }
  }
`;

const LOGOUT = gql`
  mutation logout{
    logoutUser
  }
`;

export {REGISTER, LOGIN, LOGOUT}