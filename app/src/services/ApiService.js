import axios from "axios";
import mime from "mime-types";

const graphqlUrl = process.env.REACT_APP_API;

console.log(graphqlUrl);

class ApiService {
  // Queries
  async searchProperty(input) {
    const query = `
    query searchProperty($input: property_search_input)
    {
      searchProperty(input: $input) {
        property_id
        user_id
        mls_num
        main_image_url
        street_1
        street_2
        city
        state
        zipcode
        neighborhood
        sales_price
        date_listed
        bedrooms
        bathrooms
        garage_size
        square_feet
        lot_size
        description
      }
    }`;

    return await this.queryWithVariables(query, { input });
  }

  async getPresignedUrl(property_id, file_name) {
    const query = `
    query getPresignedUrl($property_id: Int!, $file_name: String!)
    {
      getPresignedUrl(property_id: $property_id, file_name: $file_name) 
    }`;

    return await this.queryWithVariables(query, { property_id, file_name });
  }

  async getAllProperties() {
    const query = `
    {
      properties {
        property_id,
        mls_num,
        main_image_url,
        street_1,
        street_2,
        city,
        state,
        zipcode,
        neighborhood,
        sales_price,
        date_listed,
        bedrooms,
        bathrooms,
        garage_size,
        square_feet,
        lot_size,
        description,
        user_id
      }
    }`;

    return await query(query);
  }

  async validateUser(credentials) {
    const query = `
    query validateUser($username: String!, $password: String!)
    {
        validateUser(username: $username, password: $password) 
        {
          user_id,
          username,
          email
        }
    }`;

    return await this.queryWithVariables(query, credentials);
  }

  async findProperty(property_id) {
    const query = `
    query findProperty($property_id: Int!)
    {
      findProperty(property_id: $property_id) {
        property_id
        user_id
        mls_num
        main_image_url
        street_1
        street_2
        city
        state
        zipcode
        neighborhood
        sales_price
        date_listed
        bedrooms
        bathrooms
        garage_size
        square_feet
        lot_size
        description
      }
    }`;

    return await this.queryWithVariables(query, { property_id });
  }

  async mlsNumExists(mls_num, property_id) {
    const query = `
    query mlsNumExists($mls_num: String!, $property_id: Int!)
    {
      mlsNumExists(mls_num: $mls_num, property_id: $property_id) 
    }`;
    const result = await this.queryWithVariables(query, { mls_num, property_id });
    return result.mlsNumExists;
  }

  async getPropertyImages(property_id) {
    const query = `
    query images($property_id: Int!)
    {
      images(property_id: $property_id) {
        image_id
        property_id
        url
        caption
      }
    }`;

    return await this.queryWithVariables(query, { property_id });
  }

  // Mutations
  async deleteProperty(property_id) {
    const query = `
    mutation deleteProperty($property_id: Int!)
    {
      deleteProperty(property_id: $property_id)  
    }`;

    return await this.queryWithVariables(query, { property_id });
  }

  async setMainImageUrl(property_id, main_image_url) {
    const query = `
    mutation setMainImageUrl($property_id: Int!, $main_image_url: String!)
    {
      setMainImageUrl(property_id: $property_id, main_image_url: $main_image_url)  
    }`;

    return await this.queryWithVariables(query, { property_id, main_image_url });
  }

  async saveProperty(input) {
    // console.log(input);
    const query = `
    mutation saveProperty($input: property_input)
    {
      saveProperty(input: $input) {
        property_id
        user_id
        mls_num
        main_image_url
        street_1
        street_2
        city
        state
        zipcode
        neighborhood
        sales_price
        date_listed
        bedrooms
        bathrooms
        garage_size
        square_feet
        lot_size
        description
      }
    }`;

    return await this.queryWithVariables(query, { input });
  }

  async deleteImage(image_id) {
    const query = `
    mutation deleteImage($image_id: Int!)
    {
      deleteImage(image_id: $image_id)  
    }`;

    return await this.queryWithVariables(query, { image_id });
  }

  async saveImage(input) {
    const query = `
    mutation saveImage($input: image_input)
    {
      saveImage(input: $input)
    }`;

    return await this.queryWithVariables(query, { input });
  }

  // Support.
  async queryWithVariables(query, variables) {
    const data = { query, variables: variables };
    return await this.post(data);
  }

  async query(graphql) {
    const data = { query: graphql };
    return await this.post(data);
  }

  async post(data) {
    try {
      // console.log(data);
      const response = await axios.post(graphqlUrl, data);
      if (response.data.errors) {
        console.error(response.data.errors);
        throw new Error("A system error occurred.");
      }
      return response.data.data;
    } catch (err) {
      console.error(err);
      throw new Error("A system error occurred.");
    }
  }
}

const saveImage = async (image_id, property_id, url, caption) => {
  const api = new ApiService();
  const data = {
    image_id,
    property_id,
    url,
    caption
  };
  const response = await api.saveImage(data);
  return response;
};

const getPresignedUrl = async (property_id, file_name) => {
  const api = new ApiService();
  const result = await api.getPresignedUrl(property_id, file_name);
  return result.getPresignedUrl;
};

const saveFileToS3 = async (fileName, preSignedUrl, fileArrayBuffer) => {
  const mimeType = mime.lookup(fileName);
  const options = {
    method: "PUT",
    headers: { "content-type": mimeType },
    data: fileArrayBuffer,
    url: preSignedUrl
  };

  try {
    await axios(options);
  } catch (err) {
    console.log(err);
  }
};

export { ApiService, getPresignedUrl, saveFileToS3, saveImage };
