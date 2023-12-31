import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Mapbox from '@rnmapbox/maps';
Mapbox.setAccessToken(YOUR_MAPBOX_API_KEY);
const Track = ({route}) => {
  const [data, setData] = useState([]);
  console.log(data);
  useEffect(() => {
    const transformData = () => {
      return route.params.item.value.map(item => [
        item.longitude,
        item.latitude,
      ]);
    };
    const transformedData = transformData();
    console.log(transformedData);
    setData(transformedData);
  }, []);

  const [routes, setRoute] = useState({
    type: 'geojson',
    features: [
      {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: data,
        },
      },
    ],
  });

  return (
    <View style={styles.container}>
      <Mapbox.MapView
        styleURL={Mapbox.StyleURL.Light}
        zoomLevel={15}
        centerCoordinate={data[0]}
        style={styles.container}>
        <Mapbox.ShapeSource id="line1" shape={routes}>
          <Mapbox.LineLayer
            id="routeFill"
            style={{
              lineColor: '#ff8109',
              lineWidth: 3.2,
              lineCap: Mapbox.LineJoin.Round,
              lineOpacity: 1.84,
            }}
          />
        </Mapbox.ShapeSource>
        <Mapbox.Camera
          zoomLevel={15}
          centerCoordinate={data[0]}
          animationMode="flyTo"
          animationDuration={2000}
        />
      </Mapbox.MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Track;
