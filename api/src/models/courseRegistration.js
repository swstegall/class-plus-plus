module.exports = (sequelize, DataTypes) => {
  const courseRegistration = sequelize.define(
    "courseRegistration",
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
      UserID: {
        field: "UserID",
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    }
  );
  courseRegistration.associate = (models) => {
    models.courseRegistration.belongsTo(models.course);
  };
  return courseRegistration;
};
