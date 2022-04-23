const { GraphQLDate, GraphQLTime, GraphQLDateTime } = require("graphql-iso-date");
const s3service = require("./services/s3service");
const DbService = require("./services/DbService");

const dbService = new DbService();

const resolvers = {
  Query: {
    findUser: (_, { id }) => dbService.findUser(id),
    findProperty: (_, { property_id }) => dbService.findProperty(property_id),
    searchProperty: async (_, { input }) => dbService.searchProperty(input),
    mlsNumExists: async (_, { mls_num, property_id }) =>
      dbService.mlsNumExists(mls_num, property_id),
    validateUser: (_, { username, password }) => dbService.validateUser(username, password),
    getPresignedUrl: async (_, { property_id, file_name }) =>
      await s3service.getPresignedUrl(property_id, file_name),
    properties: () => dbService.properties(),
    images: (_, { property_id }) => dbService.images(property_id),
    image: (_, { image_id }) => dbService.image(image_id)
  },
  Mutation: {
    saveProperty: async (_, { input }) => dbService.saveProperty(input),
    deleteProperty: async (_, { property_id }) => dbService.deleteProperty(property_id),
    setMainImageUrl: async (_, { property_id, main_image_url }) =>
      dbService.setMainImageUrl(property_id, main_image_url),
    saveImage: async (_, { input }) => dbService.saveImage(input),
    deleteImage: async (_, { image_id }) => dbService.deleteImage(image_id)
  },
  Date: GraphQLDate,
  Time: GraphQLTime,
  DateTime: GraphQLDateTime
};

module.exports = resolvers;
