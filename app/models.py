from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship, validates
from datetime import datetime
from sqlalchemy import Column, Integer, Float, DateTime, ForeignKey

db = SQLAlchemy()

class Restaurant(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    address = db.Column(db.String(255), nullable=False)
    created_at = db.Column(DateTime, default=datetime.utcnow)
    updated_at = db.Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    pizzas = db.relationship('Pizza', secondary='restaurant_pizza', backref='restaurants')

    def __repr__(self):
        return f"<Restaurant {self.name}>"
    
class Pizza(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    ingredients = db.Column(db.String(255))

class RestaurantPizza(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurant.id'))
    pizza_id = db.Column(db.Integer, db.ForeignKey('pizza.id'))
    price = db.Column(db.Float)
    created_at = db.Column(DateTime, default=datetime.utcnow)
    updated_at = db.Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Validation for price between 1 and 30
    @validates('price')
    def validate_price(self, key, price):
        if price is None or not 1 <= price <= 30:
            raise ValueError('Price must be between 1 and 30.')
        return price

