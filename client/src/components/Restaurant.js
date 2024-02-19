import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PizzaForm from "./PizzaForm";

function Restaurant() {
  const [{ data: restaurant, error, status }, setRestaurant] = useState({
    data: null,
    error: null,
    status: "pending",
  });
  const { id } = useParams();

  useEffect(() => {
    fetch(`/restaurants/${id}`).then((r) => {
      if (r.ok) {
        r.json().then((restaurant) =>
          setRestaurant({ data: restaurant, error: null, status: "resolved" })
        );
      } else {
        r.json().then((err) =>
          setRestaurant({ data: null, error: err.error, status: "rejected" })
        );
      }
    });
  }, [id]);

  function handleAddPizza(newPizza) {
    setRestaurant(prevState => ({
      data: {
        ...prevState.data,
        pizzas: prevState.data.pizzas ? [...prevState.data.pizzas, newPizza] : [newPizza],
      },
      error: null,
      status: "resolved",
    }));
  }

  if (status === "pending") return <h1>Loading...</h1>;
  if (status === "rejected") return <h1>Error: {error.error}</h1>;

  return (
    <section className="container">
      <div className="card">
        <h1>{restaurant.name}</h1>
        <p>{restaurant.address}</p>
      </div>
      {restaurant.pizzas && (
        <div className="card">
          <h2>Pizza Menu</h2>
          {restaurant.pizzas.map((pizza) => (
            <div key={pizza.id}>
              <h3>{pizza.name}</h3>
              <p>
                <em>{pizza.ingredients}</em>
              </p>
            </div>
          ))}
        </div>
      )}
      <div className="card">
        <h3>Add New Pizza</h3>
        <PizzaForm restaurantId={restaurant.id} onAddPizza={handleAddPizza} />
      </div>
    </section>
  );

}

export default Restaurant;
