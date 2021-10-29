module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "user",
    {
      ID: {
        field: "ID",
        primaryKey: true,
        type: DataTypes.STRING,
      },
      RoleID: {
        field: "RoleID",
        type: DataTypes.STRING,
      },
      FirstName: {
        field: "FirstName",
        type: DataTypes.STRING,
      },
      LastName: {
        field: "LastName",
        type: DataTypes.STRING,
      },
      Grade: {
        field: "Grade",
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    }
  );
  return user;
};
