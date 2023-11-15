import React, { useEffect, useState } from "react";
import { SafeAreaView,  Text,  StyleSheet, TouchableOpacity } from "react-native";

const Home = ({navigation }) => {

    const onPressedContacto=()=>{
        console.log("se toca el boton");
        navigation.navigate("Contacts");
    }

    const onPressedTemperatura=()=>{
        console.log("se toca el boton");
        navigation.navigate("Temperatura");  
    }

    const onPressedQR=()=>{
        console.log("se toca el boton");
        navigation.navigate("QR");
    }

    return(
        <SafeAreaView style={styles.container}>
            <Text style={styles.home}>Home</Text>
      <TouchableOpacity style={styles.button} onPress={() => onPressedContacto()}>
        <Text style={styles.buttonText}>Contactos</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => onPressedTemperatura()}>
        <Text style={styles.buttonText}>Temperatura</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => onPressedQR()}>
        <Text style={styles.buttonText}>Acerca de</Text>
      </TouchableOpacity>
    </SafeAreaView>
    )
    
}
const styles = StyleSheet.create({
    home: {
        
        fontWeight: 'bold',
        fontSize: 20,
    },
    container: {
        flex: 0.5,
        justifyContent: "center",
        alignItems: "center",
      },
    button: {
        width: '90%',
        backgroundColor: '#007bff',
        borderRadius: 5,
        paddingVertical: 12,
        paddingHorizontal: 24,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        cursor: 'pointer',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default Home;