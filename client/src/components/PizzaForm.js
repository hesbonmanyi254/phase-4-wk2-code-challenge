import React, { useEffect, useState } from "react";

function PizzaForm({ restaurantId, onAddPizza }) {
  const [pizzas, setPizzas] = useState([]);
  const [pizzaId, setPizzaId] = useState("");
  const [price, setPrice] = useState("");
  const [formErrors, setFormErrors] = useState([]);

  useEffect(() => {
    fetch("/pizzas")
      .then((r) => r.json())
      .then(setPizzas);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const formData = {
      pizza_id: pizzaId,
      restaurant_id: restaurantId,
      price: parseInt(price),
    };
    fetch("/restaurant_pizzas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then((r) => {
      if (r.ok) {
        r.json().then((newPizza) => {
          onAddPizza(newPizza);
          setFormErrors([]);
        });
      } else {
        return r.json().then((err) => setFormErrors(err.errors));
      }
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="pizza_id">Pizza:</label>
      <select
        id="pizza_id"
        name="pizza_id"
        value={pizzaId}
        onChange={(e) => setPizzaId(e.target.value)}
      >
        <option value="">Select a pizza</option>
        {pizzas.map((pizza) => (
          <option key={pizza.id} value={pizza.id}>
            {pizza.name}
          </option>
        ))}
      </select>
      <label htmlFor="price">Price:</label>
      <input
        type="number"
        id="price"
        name="price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      {formErrors.length > 0 &&
        formErrors.map((err, index) => (
          <p key={index} style={{ color: "red" }}>
            {err.price ? err.price : err.toString()}
          </p>
        ))}
      <button type="submit">Add To Restaurant</button>
    </form>
  );
}

export default PizzaForm;
