module.exports = (sequelize, DataTypes) => {
  const role = sequelize.define(
    "role",
    {
      ID: {
        field: "ID",
        primaryKey: true,
        type: DataTypes.STRING,
      },
      Description: {
        field: "Description",
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    }
  );
  return role;
};
