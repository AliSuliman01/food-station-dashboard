import { gql } from "@apollo/client";

const GET_PRODUCTS = gql`
  query GET_PRODUCTS($filter: Mixed = "%%") {
    products(
      orderBy: [{ column: CREATED_AT, order: DESC }]
      hasTranslation: { OR: [{ column: NAME, operator: LIKE, value: $filter }] }
    ) {
      id
      price
      created_at
      translation {
        id
        name
        language_code
      }
      translations {
        id
        name
        language_code
      }
      restaurant {
        id
        name
      }
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
      ingredients {
        id
        translation {
          name
        }
      }
    }
  }
`;
const STORE_PRODUCT = gql`
  mutation STORE_PRODUCT($input: CreateProductInput!) {
    createProduct(input: $input) {
      id
      price
      created_at
      categories {
        id
        slug
      }
      translations {
        id
        name
        language_code
      }
      translation {
        id
        name
        language_code
      }
      restaurant {
        id
        name
      }
      images {
        id
        path
        is_main
      }
      main_image {
        id
        path
        is_main
      }
      ingredients {
        id
        translation {
          name
          language_code
        }
      }
    }
  }
`;
const UPDATE_PRODUCT = gql`
  mutation UPDATE_PRODUCT($id:ID!, $input: UpdateProductInput!) {
    updateProduct(
      id: $id,
      input: $input
      ) {
      id
      price
      created_at
      categories {
        id
        slug
      }
      translations {
        id
        name
        language_code
      }
      translation {
        id
        name
        language_code
      }
      restaurant {
        id
        name
      }
      images {
        id
        path
        is_main
      }
      main_image {
        id
        path
        is_main
      }
      ingredients {
        id
        translation {
          name
          language_code
        }
      }
    }
  }
`;

const DELETE_PRODUCT = gql`
  mutation DELETE_PRODUCT($id: ID!) {
    deleteProduct(id: $id) {
      id
    }
  }
`;
export default {
  GET_PRODUCTS,
  STORE_PRODUCT,
  DELETE_PRODUCT,
  UPDATE_PRODUCT
};
