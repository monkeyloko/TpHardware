import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Touchable, TouchableOpacity } from 'react-native';
import axios from 'axios';
import * as Location from 'expo-location';

const Temperatura = () => {
  const [date, setDate] = useState(new Date());
  const [temperature, setTemperature] = useState(null);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  /*const recargarTemp=()=>{
    console.log("por ahora no hace nada")
  }*/

  useEffect(() => {
    (async () => {
      // Obtener la ubicación
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
      } else {
        let userLocation = await Location.getCurrentPositionAsync({});
        setLocation(userLocation);

        // Obtener la temperatura actual
        try {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${userLocation.coords.latitude}&lon=${userLocation.coords.longitude}&APPID=0cd4c845628a93ee3dd46acea3646046&units=metric`
          );
          setTemperature(response.data);
        } catch (error) {
          setErrorMsg('Error fetching temperature data');
        }
      }
    })();

    // Actualizar la fecha y hora cada 
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.dateTime}>{date.toLocaleString()}</Text>
      {temperature !== null ? (
        <Text style={styles.temperature}>Temperatura: {temperature.main.temp}°C</Text>
      ) : (
        <Text style={styles.loading}>Cargando temperatura...</Text>
      )}
    {temperature !== null ? (<Text> {temperature.sys.country} </Text>):(<Text>cargando...</Text>)}
  {
    //<TouchableOpacity onPress={()=>recargarTemp()}> recargar </TouchableOpacity>
  }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateTime: {
    fontSize: 18,
    marginBottom: 10,
  },
  temperature: {
    fontSize: 16,
    marginBottom: 10,
  },
  loading: {
    fontSize: 16,
    marginBottom: 10,
  },
  location: {
    fontSize: 16,
    marginBottom: 10,
  },
  error: {
    fontSize: 16,
    color: 'red',
    marginBottom: 10,
  },
});

export default Temperatura;
