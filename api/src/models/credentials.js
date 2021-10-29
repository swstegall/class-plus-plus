module.exports = (sequelize, DataTypes) => {
  const credential = sequelize.define(
    "credential",
    {
      ID: {
        field: "ID",
        primaryKey: true,
        type: DataTypes.STRING,
      },
      Email: {
        field: "Email",
        type: DataTypes.STRING,
      },
      Password: {
        field: "Password",
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    }
  );
  credential.associate = (models) => {
    models.credential.hasOne(models.user, {
      foreignKey: {
        name: "ID",
      },
    });
  };
  return credential;
};
