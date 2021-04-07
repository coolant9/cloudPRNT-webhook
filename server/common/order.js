//Printer for POS, by Gautam Saluja (www.rcrlabs.com)
const { DataTypes } = require('sequelize');

function define_models(sequelize) {
  const option = (sequelize) => {
    return sequelize.define('option', {
      name: DataTypes.STRING,
      value: DataTypes.STRING
    });
  }

  const product = (sequelize) => {
    return sequelize.define('product', {
      name: DataTypes.STRING,
      price: DataTypes.NUMBER,
    });
  }

  const order = (sequelize) => {
    const Order = sequelize.define('order', {
      customerName: DataTypes.STRING,
      customerPhoneNumber: DataTypes.STRING,
      orderNumber: DataTypes.STRING,
      printStatus: DataTypes.STRING
    });
    const Product = product(sequelize);
    const Option = option(sequelize);
    Order.hasMany(Product);
    Product.hasMany(Option);
    return Order;
  }

  const job = (sequelize) => {
    const Job = sequelize.define('job', {
      jobId: DataTypes.NUMBER
    });
    const Product = product(sequelize);
    const Option = option(sequelize);
    const Order = order(sequelize);
    Job.hasMany(Order);
    Order.hasMany(Product);
    Product.hasMany(Option);
  }

  return{
    // option: option,
    // product: product,
    // order: order,
    job: job
  }
}

export default define_models;
