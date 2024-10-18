import MealItem from './meal-item';
import classes from './meals-grid.module.css';

export default function MealsGrid({ meals }) {
  return (
    <ul className={classes.meals}>
      {meals.map((meal) => (
        <li key={meal.id}>
          <MealItem {...meal} />
          {/* {...meal} 구문은 스프레드 연산자(spread operator)를 사용해 meal 객체의 모든 속성을 MealItem 컴포넌트에 prop으로 전달 */}
        </li>
      ))}
    </ul>
  );
}
