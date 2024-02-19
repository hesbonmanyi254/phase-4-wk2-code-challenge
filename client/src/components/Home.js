import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    fetch("/restaurants")
      .then((r) => {
        if (!r.ok) {
          throw new Error('Network response was not ok');
        }
        return r.json();
      })
      .then(setRestaurants)
      .catch((error) => {
        console.error('Error fetching data:', error);
        // Handle the error, e.g., set an error state or show a message to the user
      });
  }, []);

  

  function handleDelete(id) {
    fetch(`/restaurants/${id}`, {
      method: "DELETE",
    }).then((r) => {
      if (r.ok) {
        setRestaurants((restaurants) =>
          restaurants.filter((restaurant) => restaurant.id !== id)
        );
      }
    });
  }
  

  return (
    <section className="container">
      {restaurants.map((restaurant) => (
        <div key={restaurant.id} className="card">
          <h2>
            <Link to={`/restaurants/${restaurant.id}`}>{restaurant.name}</Link>
          </h2>
          <p>Address: {restaurant.address}</p>
          <button onClick={() => handleDelete(restaurant.id)}>Delete</button>
        </div>
      ))}
    </section>
  );
}

export default Home;
