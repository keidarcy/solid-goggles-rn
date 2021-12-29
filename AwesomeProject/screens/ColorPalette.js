import React from 'react';
import {Text, StyleSheet, FlatList} from 'react-native';
import ColorBox from '../components/ColorBox';

const ColorPalette = ({route}) => {
  const {colors, paletteName} = route.params;
  return (
    <FlatList
      style={styles.container}
      data={colors}
      keyExtractor={item => item.colorName}
      renderItem={({item}) => (
        <ColorBox colorName={item.colorName} hexCode={item.hexCode} />
      )}
      ListHeaderComponent={<Text style={styles.heading}>{paletteName}</Text>}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontWeight: 'bold',
    color: 'white',
  },
});

export default ColorPalette;
