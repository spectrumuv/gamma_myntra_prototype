const fs = require('fs');
const csv = require('csv-parser');
const Product = require('./models/Product');
const sequelize = require('./database');

async function importData() {
  try {
    await sequelize.sync({ force: true }); // Drops and recreates the table

    fs.createReadStream('myntra_products_sample.csv')
      .pipe(csv())
      .on('data', async (row) => {
        try {
          // Mapping CSV columns to Product model
          const { id, name, img, asin, price, mrp, rating, ratingTotal, discount, seller, purl } = row;
          
          // Create product in database
          await Product.create({
            id: parseInt(id),
            name,
            img: img.split(';').map(url => url.trim()), // Assuming `img` column contains multiple URLs separated by semicolon
            asin,
            price: parseFloat(price),
            mrp: parseFloat(mrp),
            rating: parseFloat(rating),
            ratingTotal: parseInt(ratingTotal),
            discount,
            seller,
            purl
          });
        } catch (error) {
          console.error('Error inserting row:', error.message);
        }
      })
      .on('end', () => {
        console.log('CSV file successfully processed');
      });

  } catch (error) {
    console.error('Error syncing sequelize:', error.message);
  }
}

importData();
