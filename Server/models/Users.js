module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }, {
      tableName: "users", // specify the custom table name
    });
  
    Users.associate = (models) => {
      Users.hasMany(models.Food, {
        onDelete: "cascade",
      }),

      Users.hasMany(models.Tdee, {
        onDelete: "cascade",
      }),

      Users.hasMany(models.Personal, {
        onDelete: "cascade",
      });
    };
    return Users;
  };