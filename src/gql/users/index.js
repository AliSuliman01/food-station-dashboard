import { gql } from "@apollo/client";

const GET_USERS = gql`
query GetUsers ($filter:Mixed = "%%"){
  users (
    orderBy: [{ column: CREATED_AT, order: DESC }],
    where:{
      OR:[
         { column: NAME, operator: LIKE, value: $filter },
         { column: EMAIL, operator: LIKE, value: $filter }
      ]
    }
  ){
    id
    name
    email
    photo_path
    created_at
  }
}
`;

const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
    }
  }
`;

const STORE_USER = gql`
  mutation CREATE_USER($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      name
      email
      photo_path
      created_at
    }
  }
`;

const UPDATE_USER = gql`
  mutation UPDATE_USER($id: ID!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      id
      name
      email
      photo_path
      created_at
    }
  }
`;

export default {
  GET_USERS,
  // login,
  // logout,
  // signup,
  STORE_USER,
  UPDATE_USER,
  DELETE_USER,
};
