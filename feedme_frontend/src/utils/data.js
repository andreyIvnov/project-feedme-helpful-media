export const userQuery = (userId) => {
      const query = `*[_type == "user" && _id == '${userId}']`;

      return query;
}
// Try to get a document of type = "user" and the id is equal to userId 