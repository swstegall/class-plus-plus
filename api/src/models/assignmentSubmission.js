module.exports = (sequelize, DataTypes) => {
  const assignmentSubmission = sequelize.define(
    "assignmentSubmission",
    {
      ID: {
        field: "ID",
        primaryKey: true,
        type: DataTypes.STRING,
      },
      AssignmentID: {
        field: "AssignmentID",
        type: DataTypes.STRING,
      },
      UserID: {
        field: "UserID",
        type: DataTypes.STRING,
      },
      File: {
        field: "File",
        type: DataTypes.BLOB,
      },
    },
    {
      timestamps: false,
    }
  );
  return assignmentSubmission;
};
