import { gql } from "@apollo/client";

const GET_RESTAURANTS = gql`
  query GET_RESTAURANTS  ($filter:Mixed = "%%"){
    
        restaurants(
          orderBy: [{ column: CREATED_AT, order: DESC }],
          where:{
            OR:[
               { column: NAME, operator: LIKE, value: $filter },
               { column: FULL_ADDRESS, operator: LIKE, value: $filter }
            ]
          }
    
        ){
          id
          name
          latitude
          longitude
          full_address
          cover_image_path
          created_at
          user{
            name
            email
            photo_path
          }
        }
      }
  
`;

const DELETE_RESTAURANT = gql`
  mutation DELETE_RESTAURANT($id: ID!) {
    deleteRestaurant(id: $id) {
      id
    }
  }
`;

const STORE_RESTAURANT = gql`
  mutation STORE_RESTAURANT($input: CreateRestaurantInput!) {
    createRestaurant(input: $input) {
      id
      name
      latitude
      longitude
      full_address
      created_at
      cover_image_path
      user {
        name
        email
        photo_path
      }
    }
  }
`;

const UPDATE_RESTAURANT = gql`
  mutation UPDATE_RESTAURANT($id: ID!, $input: UpdateRestaurantInput!) {
    updateRestaurant(id: $id, input: $input) {
      id
      name
      latitude
      longitude
      full_address
      cover_image_path
      created_at
      images {
        path
        is_main
      }
      user {
        name
        email
        photo_path
      }
    }
  }
`;

export default {
  GET_RESTAURANTS,
  DELETE_RESTAURANT,
  STORE_RESTAURANT,
  UPDATE_RESTAURANT,
};
