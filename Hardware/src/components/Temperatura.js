import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import * as Location from 'expo-location';

const Temperatura = () => {
  const [date, setDate] = useState(new Date());
  const [temperature, setTemperature] = useState(null);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          setLoading(false);
        } else {
          let userLocation = await Location.getCurrentPositionAsync({});
          setLocation(userLocation);
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${userLocation.coords.latitude}&lon=${userLocation.coords.longitude}&APPID=0cd4c845628a93ee3dd46acea3646046&units=metric`
          );
          setTemperature(response.data);
          setLoading(false);
        }
      } catch (error) {
        setErrorMsg('Error fetching temperature data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : temperature ? (
        <View style={styles.weatherContainer}>
          <Text style={styles.dateTime}>{date.toLocaleString()}</Text>
          <Text style={styles.temperatureText}>
            Temperatura: {temperature.main.temp}°C
          </Text>

          <Text style={styles.description}>
            {temperature.weather[0].description}
          </Text>

          <Text style={styles.countryText}>
            País: {temperature.sys.country}
          </Text>
          <Text style={styles.countryText}>
            Barrio: {temperature.name}
          </Text>
        </View>
      ) : (
        <Text style={styles.error}>{errorMsg}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
  },
  dateTime: {
    fontSize: 16,
    marginBottom: 20,
    color: '#2c3e50',
  },
  weatherContainer: {
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 4,
  },
  temperatureText: {
    fontSize: 20,
    marginBottom: 10,
    color: '#3498db',
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
    color: '#3498db',
  },
  countryText: {
    fontSize: 16,
    color: '#34495e',
    marginBottom: 10,
  },
  error: {
    fontSize: 16,
    color: 'red',
    marginTop: 20,
  },
});

export default Temperatura;
