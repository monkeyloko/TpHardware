import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import * as Contacts from 'expo-contacts';

const Contactos = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.FirstName, Contacts.Fields.LastName, Contacts.Fields.PhoneNumbers, Contacts.Fields.IsDefaultEmergency],
        });

        if (data.length > 0) {
          setContacts(data);
        }
      }
    })();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.contactItem}>
      <Text>{`${item.firstName} ${item.lastName}`}</Text>
      <Text>{item.phoneNumbers[0].number}</Text>
      {item.isDefaultEmergency && (
        <Text style={styles.emergencyText}>Emergencia</Text>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Contactos:</Text>
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  contactItem: {
    marginBottom: 10,
  },
  emergencyText: {
    color: 'red',
    fontWeight: 'bold',
  },
});

export default Contactos;
