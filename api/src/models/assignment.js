module.exports = (sequelize, DataTypes) => {
  const assignment = sequelize.define(
    "assignment",
    {
      ID: {
        field: "ID",
        primaryKey: true,
        type: DataTypes.STRING,
      },
      CourseID: {
        field: "CourseID",
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
      DueDate: {
        field: "DueDate",
        type: DataTypes.DATE,
      },
    },
    {
      timestamps: false,
    }
  );
  return assignment;
};
