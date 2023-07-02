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
    }, {
      tableName: "users", // specify the custom table name
    });
  
    // Users.associate = (models) => {
    //   Users.hasMany(models.Posts, {
    //     onDelete: "cascade",
    //   });
    // };
    return Users;
  };