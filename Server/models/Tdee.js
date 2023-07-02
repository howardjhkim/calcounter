module.exports = (sequelize, DataTypes) => {
    const Tdee = sequelize.define("Tdee", {
      cutProtein: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      cutCarbs: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      cutFat: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      cutCalories: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      maintainProtein: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      maintainCarbs: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      maintainFat: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      maintainCalories: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      gainProtein: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      gainCarbs: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      gainFat: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      gainCalories: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },



    }, {
      tableName: "tdee", // specify the custom table name
    });
  
  
    return Tdee;
  };