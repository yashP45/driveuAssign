import React, { useEffect, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useData } from '../../DataContext';
import { useNavigation } from '@react-navigation/native';
import { clearStorage } from '../utils/asyncStorage';

const History = () => {
  const { data, dispatch } = useData();
  const navigation = useNavigation();

  useEffect(() => {
    const get = async () => {
      try {
        const keys = await AsyncStorage.getAllKeys();
        const result = await AsyncStorage.multiGet(keys);

        const parsedData = result.map(([key, value]) => ({
          key,
          value: JSON.parse(value),
        }));

        dispatch({ type: 'SET_DATA', payload: parsedData });
      } catch (error) {
        console.error('Error fetching data from AsyncStorage:', error);
      }
    };

    get();
  }, [dispatch]);

  const handleItemClick = item => {
    navigation.navigate('Track', { item });
  };

  const clearData = useCallback(() => {
    Alert.alert(
      'Clear Data',
      'Are you sure you want to clear all data?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            try {
              clearStorage();
              dispatch({ type: 'SET_DATA', payload: [] });
            } catch (error) {
              console.error('Error clearing data:', error);
            }
          },
        },
      ],
      { cancelable: false }
    );
  }, [dispatch]);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleItemClick(item)}>
      <View
        style={{
          backgroundColor: '#ffffff',
          marginVertical: 10,
          elevation: 10,
          paddingHorizontal: 20,
          marginHorizontal: 10,
          borderRadius: 10
        }}>
        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#000" }}>{item.key}</Text>
        {item.value.map((ele, index) => (
          <View
            key={index}
            style={{
              marginVertical: 10,
              paddingVertical: 10,
              borderRadius: 20,
              alignItems: 'center',
              borderRadius: 10,
              borderWidth: 1,
              borderColor: "#041E42"
            }}>
            <Text>Time Stamp {ele.timestamp}</Text>
            <Text>Longitude{ele.longitude}</Text>
            <Text>Latitude{ele.latitude}</Text>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ backgroundColor: "#1B2021", flex: 1 }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 10,
          paddingVertical: 20,
        }}>
        <Text style={{ fontSize: 20, color: '#fff', fontWeight: "bold" }}>History</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity
            style={{ backgroundColor: '#AA0000', padding: 10, borderRadius: 10 }}
            onPress={clearData}>
            <Text style={{ color: '#fff', fontWeight: "bold" }}>Clear Data</Text>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.key}
        style={{ backgroundColor: 'transparent' }}
      />
    </View>
  );
};

export default History;

const styles = StyleSheet.create({});
