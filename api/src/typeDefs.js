// The GraphQL schema in string form
const typeDefs = `
  scalar Date
  scalar Time
  scalar DateTime
  
  type Query { 
    books: [Book],
    images(property_id: Int!): [image],
    image(image_id: Int!): [image],
    findBook(id: Int): Book,
    findUser(id: Int): user!,
    findProperty(property_id: Int): property!,
    validateUser(username: String!, password: String!): user,
    mlsNumExists(mls_num: String!, property_id: Int!): Boolean!,
    users: [user],
    properties: [property],
    getPresignedUrl(property_id: Int!, file_name: String!): String!
    searchProperty(input: property_search_input): [property]
  }

  type Mutation {
    saveProperty(input: property_input): property!
    deleteProperty(property_id: Int!): Boolean!
    setMainImageUrl(property_id: Int!, main_image_url: String!): Boolean!
    saveImage(input: image_input): Int!
    deleteImage(image_id: Int!): Boolean!
  }

  type Book { 
    bookId: Int,
    title: String, 
    author: String 
  }

  type image {
    image_id: Int!, 
    property_id: Int!,
    url: String,
    caption: String
  }

  input image_input {
    image_id: Int!, 
    property_id: Int!,
    url: String,
    caption: String
  }
  
  type user { 
      user_id: Int, 
      username: String,
      password: String,
      email: String
    }

  type property {
    property_id: Int,
    user_id: Int,
    mls_num: String,
    main_image_url: String,
    street_1: String,
    street_2: String,
    city: String,
    state: String,
    zipcode: String,
    neighborhood: String,
    sales_price: String,
    date_listed: Date,
    bedrooms: String,
    bathrooms: String,
    garage_size: String,
    square_feet: String,
    lot_size: String,
    description: String
  }

  input property_input {
    property_id: Int,
    user_id: Int,
    mls_num: String,
    main_image_url: String,
    street_1: String,
    street_2: String,
    city: String,
    state: String,
    zipcode: String,
    neighborhood: String,
    sales_price: String,
    date_listed: String,
    bedrooms: String,
    bathrooms: String,
    garage_size: String,
    square_feet: String,
    lot_size: String,
    description: String
  }

  input property_search_input {
    user_id: String,
    mls_num: String,
    city: String,
    state: String,
    zipcode: String,
    bedrooms: String,
    bathrooms: String,
    square_feet: String
  }
`;

module.exports = typeDefs;
