import { gql } from "@apollo/client";

const CATEGORY_RESPONSE_FIELDS = `
id
name
slug
created_at
main_image {
  id
  path
  is_main
}

images {
    id
    path
    is_main
  }
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


parent_category {
  id
  translation{
    id
    name
    language_code
  }
}

`;
const GET_CATEGORIES = gql`
query GET_CATEGORIES
    {
    categories(
        orderBy: [{ column: CREATED_AT, order: DESC }]
          ) {
    ${CATEGORY_RESPONSE_FIELDS}
  }
}
`;

const STORE_CATEGORY = gql`
mutation STORE_CATEGORY($input:CreateCategoryInput!){
    createCategory(
    input:$input
    ){
    ${CATEGORY_RESPONSE_FIELDS}
  }
}
`;

const UPDATE_CATEGORY = gql`
mutation UPDATE_CATEGORY($id:ID!, $input: UpdateCategoryInput!){
    updateCategory(
        id:$id,
    input:$input
    ){
    ${CATEGORY_RESPONSE_FIELDS}
  }
}
`;

const DELETE_CATEGORY = gql`
mutation DELETE_CATEGORY($id:ID!){
    deleteCategory(id:$id){
        ${CATEGORY_RESPONSE_FIELDS}
}
}
`;

export default {
  GET_CATEGORIES,
  STORE_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
};
