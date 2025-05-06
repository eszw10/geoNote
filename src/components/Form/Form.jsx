// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUrlPosition } from "../../hooks/useUrlPosition";
import { useCities } from "../../contexts/CitiesContext";

import Button from "../Button/Button";
import Spinner from "../Spinner/Spinner";
import Message from "../Message/Message";
import DatePicker from "react-datepicker";

import styles from "./Form.module.css";
import "react-datepicker/dist/react-datepicker.css";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [lat, lng] = useUrlPosition();
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [cityName, setCityName] = useState("");
  const [locationError, setLocationError] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("");
  const navigate = useNavigate();
  const { isLoading, createCity } = useCities();

  const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client?";

  useEffect(() => {
    if (!lat && !lng) return;

    async function fetchCity() {
      try {
        setLocationError("");
        setIsLoadingLocation(true);
        const res = await fetch(`${BASE_URL}latitude=${lat}&longitude=${lng}`);
        const data = await res.json();
        if (!data.countryCode)
          throw new Error("That place is not recognized, click anywhere else");
        setCityName(data.city || data.locality || "");
        setCountry(data.countryCode || "");
        setEmoji(convertToEmoji(data.countryCode));
      } catch (err) {
        setLocationError(err.message);
      } finally {
        setIsLoadingLocation(false);
      }
    }
    fetchCity();
  }, [lat, lng]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!cityName || !date) return;
    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: {
        lat,
        lng,
      },
    };

    await createCity(newCity);
    navigate("/app/cities");
  }

  if (!lat && !lng)
    return <Message message="Start by clicking somewhere on the map" />;
  if (isLoadingLocation) return <Spinner />;
  if (locationError) return <Message message={locationError} />;

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={(e) => handleSubmit(e)}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          id="date"
          onChange={(date) => setDate(date)}
          selected={date}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button>Add</Button>
        <Button
          type="back"
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          &larr; Back
        </Button>
      </div>
    </form>
  );
}

export default Form;
