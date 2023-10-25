import React, { useEffect, useState } from "react";
import { SafeAreaView, FlatList, Text, View, StyleSheet, TouchableOpacity, ScrollView, Animated } from "react-native";

const Home = ({navigation }) => {

    const onPressed=()=>{
        console.log("se toca el boton")
        //navigation.navigate("")
    }

    return(
        <SafeAreaView>
            <TouchableOpacity style={styles.button} onPress={() => onPressed()}>
                <Text style ={styles.buttonText}>Acerca</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
    
}
const styles = StyleSheet.create({
    button: {
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