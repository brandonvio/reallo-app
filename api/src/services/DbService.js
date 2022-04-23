const db = require("../../db");

class DbService {
  async findUser(id) {
    return db("user")
      .where("user_id", id)
      .first();
  }

  async findProperty(property_id) {
    return db("property")
      .where("property_id", property_id)
      .first();
  }

  async searchProperty(input) {
    return db("property")
      .where(builder => {
        if (input.mls_num) builder.where("mls_num", input.mls_num);
        if (input.user_id) builder.where("user_id", input.user_id);
        if (input.zipcode) builder.where("zipcode", input.zipcode);
        if (input.city) builder.where("city", input.city);
        if (input.state) builder.where("state", input.state);
        if (input.bedrooms) builder.where("bedrooms", ">=", input.bedrooms);
        if (input.bathrooms) builder.where("bathrooms", ">=", input.bathrooms);
        if (input.square_feet) builder.where("square_feet", ">=", input.square_feet);
      })
      .orderBy("sales_price", "desc");
  }

  async mlsNumExists(mls_num, property_id) {
    const result = await db("property")
      .where("mls_num", mls_num)
      .andWhereNot("property_id", property_id)
      .select("property_id")
      .first();
    return !!result;
  }

  async validateUser(username, password) {
    return db("user")
      .where({ username: username, password: password })
      .first();
  }

  async users() {
    return db("user");
  }

  async properties() {
    return db("property").orderBy("sales_price", "desc");
  }

  async images(property_id) {
    return db("image").where("property_id", property_id);
  }

  async image(image_id) {
    return db("image").where("image_id", image_id);
  }

  async saveProperty(input) {
    // console.log("resolvers.saveproperty.input", input);
    console.log("input.date_listed", input.date_listed);
    let property_id = input.property_id;
    input.date_listed = new Date(input.date_listed)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
    if (property_id === 0) {
      const result = await db.insert(input, ["property_id"]).into("property");
      property_id = result[0];
    } else {
      await db("property")
        .where("property_id", input.property_id)
        .update(input);
    }

    return db("property")
      .where("property_id", property_id)
      .first();
  }

  async deleteProperty(property_id) {
    // console.log("delete", property_id);
    await db("image")
      .where("property_id", property_id)
      .delete();

    return db("property")
      .where("property_id", property_id)
      .delete();
  }

  async setMainImageUrl(property_id, main_image_url) {
    return db("property")
      .where("property_id", property_id)
      .update({ main_image_url });
  }

  async saveImage(input) {
    // console.log("resolvers.saveproperty.input", input);
    let image_id = input.image_id;
    if (image_id === 0) {
      const result = await db.insert(input, ["image_id"]).into("image");
      image_id = result[0];
    } else {
      await db("image")
        .where("image_id", input.image_id)
        .update(input);
    }
    return image_id;
  }

  async deleteImage(image_id) {
    return db("image")
      .where("image_id", image_id)
      .delete();
  }
}

module.exports = DbService;
