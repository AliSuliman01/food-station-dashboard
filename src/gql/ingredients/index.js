import { gql } from "@apollo/client";

const INGREDIENT_RESPONSE_FIELDS = `
  id
  created_at
  translation{
    id
    name
    language_code
  }
  translations{
    id
    name
    language_code
  }
  main_image{
    id
    path
    is_main
  }
  images{
    id
    path
    is_main
  }
  categories {
    id
    translation {
      name
      language_code
    }
  }
`
const GET_INGREDIENTS = gql`
query GET_INGREDIENTS($filter:Mixed = "%%"){
    ingredients(
      orderBy: [{ column: CREATED_AT, order: DESC }]
      hasTranslation: { OR: [{ column: NAME, operator: LIKE, value: $filter }] }
    ){
      ${INGREDIENT_RESPONSE_FIELDS}
    }
  }
`

const STORE_INGREDIENT = gql`
mutation CREATE_INGREDIENT($input: CreateIngredientInput!){
    createIngredient(
      input:$input
    ){
      ${INGREDIENT_RESPONSE_FIELDS}
    }
  }`

const UPDATE_INGREDIENT = gql`
mutation UPDATE_INGREDIENT($id:ID!, $input: UpdateIngredientInput!){
    updateIngredient(
      id:$id,
      input:$input
    ){
      ${INGREDIENT_RESPONSE_FIELDS}
    }
  }`

const DELETE_INGREDIENT = gql`
mutation DELETE_INGREDIENT($id:ID!){
    deleteIngredient(
      id:$id
    ){
      ${INGREDIENT_RESPONSE_FIELDS}
    }
  }`

export default {
    GET_INGREDIENTS,
    STORE_INGREDIENT,
    UPDATE_INGREDIENT,
    DELETE_INGREDIENT,
}