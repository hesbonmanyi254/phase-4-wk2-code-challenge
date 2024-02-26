from run import app
from models import Restaurant, Pizza, RestaurantPizza, db

def seed_data():
    with app.app_context():
        # Create restaurants
        restaurants_data = [
            {'name': 'Pizza Hut', 'address': '123 Main St'},
            {'name': 'Domino\'s Pizza', 'address': '456 Elm St'},
            {'name': 'Papa John\'s', 'address': '789 Oak St'},
            {'name': 'Little Caesars', 'address': '321 Pine St'},
            {'name': 'Pizza Express', 'address': '654 Cedar St'}
        ]
        for data in restaurants_data:
            restaurant = Restaurant(**data)
            db.session.add(restaurant)
        db.session.commit()

        # Create pizzas
        pizzas_data = [
            {'name': 'Cheese Pizza', 'ingredients': 'Cheese, Tomato Sauce'},
            {'name': 'Pepperoni Pizza', 'ingredients': 'Pepperoni, Cheese, Tomato Sauce'},
            {'name': 'Vegetarian Pizza', 'ingredients': 'Mushrooms, Peppers, Onions, Cheese, Tomato Sauce'},
            {'name': 'Hawaiian Pizza', 'ingredients': 'Ham, Pineapple, Cheese, Tomato Sauce'},
            {'name': 'Meat Lovers Pizza', 'ingredients': 'Pepperoni, Sausage, Bacon, Ham, Cheese, Tomato Sauce'}
        ]
        for data in pizzas_data:
            pizza = Pizza(**data)
            db.session.add(pizza)
        db.session.commit()

        # Create restaurant pizzas
        restaurant_pizzas_data = [
            {'restaurant_id': 1, 'pizza_id': 1, 'price': 10.99},
            {'restaurant_id': 1, 'pizza_id': 2, 'price': 12.99},
            {'restaurant_id': 2, 'pizza_id': 1, 'price': 11.99},
            {'restaurant_id': 2, 'pizza_id': 3, 'price': 13.99},
            {'restaurant_id': 3, 'pizza_id': 2, 'price': 12.49},
            {'restaurant_id': 3, 'pizza_id': 4, 'price': 14.99},
            {'restaurant_id': 4, 'pizza_id': 3, 'price': 13.79},
            {'restaurant_id': 4, 'pizza_id': 5, 'price': 15.99},
            {'restaurant_id': 5, 'pizza_id': 1, 'price': 11.29},
            {'restaurant_id': 5, 'pizza_id': 5, 'price': 16.49}
        ]
        for data in restaurant_pizzas_data:
            restaurant_pizza = RestaurantPizza(**data)
            db.session.add(restaurant_pizza)
        db.session.commit()

if __name__ == '__main__':
    seed_data()
