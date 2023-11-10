import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import * as Contacts from 'expo-contacts';

const Contactos = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);

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
          setLoading(false);
        }
      }
    })();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.contactItem}>
      <Text style={styles.contactName}>{`${item.firstName} ${item.lastName}`}</Text>
      {item.phoneNumbers && item.phoneNumbers.length > 0 && (
        <Text>{item.phoneNumbers[0].number}</Text>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Lista de Contactos:</Text>
      {loading ? (
        <Text>Cargando...</Text>
      ) : (
        <FlatList
          data={contacts}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffff',
  },
  header: {
    alignItems: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  contactItem: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 4,
  },
  contactName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default Contactos;
  