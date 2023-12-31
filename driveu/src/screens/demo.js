import React, { useEffect, useState} from 'react';
import {
  Button,
  PermissionsAndroid,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import RNLocation from 'react-native-location';
import Mapbox from '@rnmapbox/maps';
import moment from 'moment';
import BackgroundService from 'react-native-background-actions';
import {setItem} from '../utils/asyncStorage';
Mapbox.setAccessToken(
  'sk.eyJ1IjoieWFzaHA0NSIsImEiOiJjbHF0NGhqeHM0aWdmMnFycWtsdHdtYnBiIn0.CqOVqvzOSc5ES-WS_52xrw',
);
// Mapbox.setConnected(true);

console.log(BackgroundService.isRunning())
const App = () => {
  const [location, setLocation] = useState([]);
  const [sessionLocation, setSessionLocation] = useState([]);

  useEffect(() => {
    Mapbox.setAccessToken(
      'sk.eyJ1IjoieWFzaHA0NSIsImEiOiJjbHF0NGhqeHM0aWdmMnFycWtsdHdtYnBiIn0.CqOVqvzOSc5ES-WS_52xrw',
    );
  }, []);

  const options = {
    taskName: 'Location',
    taskTitle: 'Location Tracking in background',
    taskDesc: 'New Task',
    taskIcon: {
      name: 'ic_launcher',
      type: 'mipmap',
    },
 
    linkingURI: 'yourSchemeHere://chat/jane',
    parameters: {
      delay: 1000,
    },
  };
  // --- Request Permission -----------

  RNLocation.configure({
    distanceFilter: 5.0,
    desiredAccuracy: {
      ios: 'best',
      android: 'balancedPowerAccuracy',
    },
    // Android only
    androidProvider: 'auto',
    interval: 1000,
    fastestInterval: 100,
    maxWaitTime: 5000,
    // iOS Only
    activityType: 'other',
    allowsBackgroundLocationUpdates: true,
    headingFilter: 1, 
    headingOrientation: 'portrait',
    pausesLocationUpdatesAutomatically: false,
    showsBackgroundLocationIndicator: true,
  });

  const stopUpdatingLocation = () => {
    setLocation([]);
    BackgroundService.stop();
    let dateString = moment(sessionLocation[0].timestamp).format('LLLL');
    setItem(dateString, JSON.stringify(sessionLocation));
    setSessionLocation([]);
  };

  const backgroundService = async () => {
    const granted = await RNLocation.requestPermission({
      ios: 'whenInUse',
      android: {
        detail: 'fine',
        rationale: {
          title: 'Location permission',
          message: 'We use your location to demo the library',
          buttonPositive: 'OK',
          buttonNegative: 'Cancel',
        },
      },
    });
    if (granted) {
        startUpdatingLocation();
        BackgroundService.start(startUpdatingLocation, options);
    }
  };
  const startUpdatingLocation = () => {
    const subscription = RNLocation.subscribeToLocationUpdates((locations) => {
      setLocation(locations[0]);
      setSessionLocation(prevLocations => [...prevLocations, locations[0]]);
      BackgroundService.updateNotification({taskDesc: locations[0]?.latitude});
    });

    return () => {
      subscription();
      setLocation(null);
    };
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          gap:10,
          marginVertical: 10
          
        }}>
        <TouchableOpacity style={styles.button1} onPress={backgroundService}>
          <Text style={{color: "#fff"}}>Start Tracking</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button2} onPress={stopUpdatingLocation}>
          <Text style={{color: "#fff"}}>Stop Tracking</Text>
        </TouchableOpacity>
      </View>
      {location.length !== 0 && (
        <Mapbox.MapView style={styles.map}>
          <Mapbox.Camera
            zoomLevel={15}
            centerCoordinate={[location?.longitude, location?.latitude]}
            animationMode="flyTo"
            animationDuration={2000}
          />

          <Mapbox.PointAnnotation
            id="userLocation"
            coordinate={[location?.longitude, location?.latitude]}
            title="Your location"
          />
        </Mapbox.MapView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#1B2021',
  },
  item: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button1: {
    backgroundColor: '#228B22',
   width: "50%",
   paddingVertical: 10,
   alignItems: "center",
   borderRadius: 10
  },
  button2: {
    backgroundColor: 'red',
   width: "50%",
   paddingVertical: 10,
   alignItems: "center",
   borderRadius: 10
  },
  map: {
    flex: 1,
  },
});

export default App;
