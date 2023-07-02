module.exports = (sequelize, DataTypes) => {
    const Personal = sequelize.define("Personal", {
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      height: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      weight: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      goalWeight: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      activity: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      startDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      targetDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      daysRemaining: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      tdeeDb: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      bmrDb: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      fitnessGoal: {
        type: DataTypes.STRING,
        allowNull: false,
      },

    }, {
      tableName: "personal", // specify the custom table name
    });
  
  
    return Personal;
  };