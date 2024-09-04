const express = require("express");
const app = express();
app.listen(3000, function () {
  console.log("Express App is listening for http requests on port: 3000");
});
// Route 1
app.get("/greetings/:name", function (req, res) {
  res.send(`Hello there, ${req.params.name}`);
});

// Route 2
app.get("/roll/:number", function (req, res) {
  const number = parseInt(req.params["number"]);

  if (isNaN(number) || number < 0) {
    res.send("Please provide a valid number.");
  } else {
    const randomNumber = Math.floor(Math.random() * (number + 1));

    res.send(`You rolled a ${randomNumber}.`);

  }
});


// Route 3
app.get("/collectibles/:index", function (req, res) {
  const collectibles = [
    { name: "shiny ball", price: 5.95 },
    { name: "autographed picture of a dog", price: 10 },
    { name: "vintage 1970s yogurt SOLD AS-IS", price: 0.99 },
  ];
  const index = parseInt(req.params["index"]);
  if (isNaN(index) || index < 0 || index >= collectibles.length) {
    res.send("This item is not yet in stock. Check back soon!");
  } else {
    const item = collectibles[index];
    res.send(
      `So, you want the ${item.name}? For ${item.price}, it can be yours!`
    );
  }
});


// Route 4
app.get("/shoes", function (req, res) {
  const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" },
  ];

  const { "min-price": minPrice, "max-price": maxPrice, type } = req.query;
  let filteredShoes = shoes;
  if (minPrice) {
    filteredShoes = filteredShoes.filter(
      (shoe) => shoe.price >= parseFloat(minPrice)
    );
  }
  if (maxPrice) {
    filteredShoes = filteredShoes.filter(
      (shoe) => shoe.price <= parseFloat(maxPrice)
    );
  }
  if (type) {
    filteredShoes = filteredShoes.filter(
      (shoe) => shoe.type.toLowerCase() === type.toLowerCase()
    );
  }

  res.json(filteredShoes);
});
