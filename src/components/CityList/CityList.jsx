import CityItem from "../CityItem/CityItem";
import Spinner from "../Spinner/Spinner";
import Message from "../Message/Message";
import styles from "./CityList.module.css";
import { useCities } from "../../contexts/CitiesContext";

function CityList() {
  const { cities, isLoading } = useCities();
  if (isLoading) return <Spinner />;
  if (!cities.length)
    return <Message message={"No cities found, click map to add one"} />;
  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem key={city.id} city={city} />
      ))}
    </ul>
  );
}

export default CityList;
