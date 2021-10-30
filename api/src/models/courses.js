module.exports = (sequelize, DataTypes) => {
  const course = sequelize.define(
    "course",
    {
      ID: {
        field: "ID",
        primaryKey: true,
        type: DataTypes.STRING,
      },
      Label: {
        field: "Label",
        type: DataTypes.STRING,
      },
      Title: {
        field: "Title",
        type: DataTypes.STRING,
      },
      Description: {
        field: "Description",
        type: DataTypes.STRING,
      },
      CreatedByUserID: {
        field: "CreatedByUserID",
        type: DataTypes.STRING,
      }
    },
    {
      timestamps: false,
    }
  );
  return course;
};
