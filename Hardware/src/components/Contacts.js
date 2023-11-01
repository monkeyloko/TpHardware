import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import * as Contacts from 'expo-contacts';

const Contactos = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.FirstName, Contacts.Fields.LastName, Contacts.Fields.PhoneNumbers],
        });

        if (data.length > 0) {
         
          setContacts(data);
          setLoading(true);
        }
        console.log(contacts);
        console.log("pene");
      }
    })();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.contactItem}>
      <Text>{`${item.firstName} ${item.lastName}`}</Text>
      {item.phoneNumbers && item.phoneNumbers.length > 0 && (
      <Text>{item.phoneNumbers[0].number}</Text>
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
