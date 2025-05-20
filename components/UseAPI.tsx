import React, {useEffect, useState} from 'react';
import {SafeAreaView, FlatList, Text, StyleSheet} from 'react-native';
import axios from 'axios';

const API_URL = 'https://drc.api.dharmatech.in/v1/all-stock';
const API_TOKEN = 'e2ZVTkyM6Ad';

const UseAPI = () => {
  const [diamonds, setDiamonds] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    axios
      .get(API_URL, {
        headers: {
          Authorization: API_TOKEN,
        },
      })
      .then(response => {
        setDiamonds(response.data);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to fetch data. Check your token or permissions.');
      });
  }, []);
  console.log('Diamonds:', diamonds);

  return (
    <SafeAreaView style={styles.container}>
      <Text>Hello From UseAPI component...</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <FlatList
        data={diamonds[0]}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <Text style={styles.item}>{JSON.stringify(item)}</Text>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16},
  item: {padding: 10, borderBottomWidth: 1},
  error: {color: 'red', marginBottom: 10},
});

export default UseAPI;
