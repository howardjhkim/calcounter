module.exports = (sequelize, DataTypes) => {
    const Food = sequelize.define("Food", {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      protein: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      carbs: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      fat: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      calories: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }, {
      tableName: "food", // specify the custom table name
    });
  
    return Food;
  };