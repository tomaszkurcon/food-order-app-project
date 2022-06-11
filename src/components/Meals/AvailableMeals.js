import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import { useEffect, useCallback, useState } from "react";
// const DUMMY_MEALS = [
//   {
//     id: "m1",
//     name: "Sushi",
//     description: "Finest fish and veggies",
//     price: 22.99,
//   },
//   {
//     id: "m2",
//     name: "Schnitzel",
//     description: "A german specialty!",
//     price: 16.5,
//   },
//   {
//     id: "m3",
//     name: "Barbecue Burger",
//     description: "American, raw, meaty",
//     price: 12.99,
//   },
//   {
//     id: "m4",
//     name: "Green Bowl",
//     description: "Healthy...and green...",
//     price: 18.99,
//   },
// ];

const AvailableMeals = () => {
    const [error, setError]=useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [availableMeals, setAvailableMeals]= useState([]);
    const loadAvailableMeals = useCallback(async () => {
      setIsLoading(true);
      try {
        const response = await fetch('https://react-http-36eb5-default-rtdb.firebaseio.com/meals.json');
        if(!response.ok) {
          throw new Error('Something went wrong!');
        }
        const data = await response.json();
        const loadedMeals = [];
        for(const key in data) {
          loadedMeals.push({
            id: key,
            name: data[key].name,
            description: data[key].description,
            price: data[key].price
          })
        }
        setAvailableMeals(loadedMeals);
        setIsLoading(false);
      } catch(error){
        setError(error.message);
        setIsLoading(false);
      }
        
    }, [])

    useEffect(()=> {
      loadAvailableMeals()
    }, [loadAvailableMeals])
  
 
 if(isLoading) {
  return (
    <section className={classes.MealsLoading}>
        <p>Loading...</p>
    </section>
  )
 }
 if(error) {
  return (
    <section className={classes.MealsError}>
        <p>{error}</p>
    </section>
  )
 }
  const mealsList = availableMeals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  return (
    <section className={classes.meals}>
      <Card>
        {!error && <ul>{mealsList}</ul>}
      </Card>
    </section>
  );
};

export default AvailableMeals;
