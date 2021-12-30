import React, {useState, useEffect, useCallback} from 'react';
import {StyleSheet, FlatList, RefreshControl, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import PalettePreview from '../components/PaletterPreview';

const Home = ({navigation, route}) => {
  const newColorPalette = route.params?.newColorPalette;
  const [colorPalette, setColorPalette] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const fetchColorPalette = useCallback(async () => {
    const result = await fetch(
      'https://color-palette-api.kadikraman.vercel.app/palettes',
    );
    if (result.ok) {
      const palettes = await result.json();
      setColorPalette(palettes);
    }
  }, []);

  useEffect(() => {
    fetchColorPalette();
  }, [fetchColorPalette]);

  useEffect(() => {
    if (newColorPalette) {
      setColorPalette(p => [newColorPalette, ...p]);
    }
  }, [newColorPalette, setColorPalette]);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchColorPalette();
    setTimeout(() => {
      setRefreshing(false);
    }, 3000);
  }, [fetchColorPalette]);

  return (
    <FlatList
      style={styles.list}
      data={colorPalette}
      keyExtractor={item => item.paletteName}
      renderItem={({item}) => (
        <PalettePreview
          onPress={() => {
            navigation.navigate('ColorPalette', item);
          }}
          palette={item}
        />
      )}
      ListHeaderComponent={
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ColorPaletteModal');
          }}>
          <Text style={styles.buttonText}>Add a color schema</Text>
        </TouchableOpacity>
      }
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    />
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 10,
    backgroundColor: '#fff',
  },
  buttonText: {
    fontWeight: 'bold',
    paddingVertical: 18,
    color: 'teal',
    marginBottom: 10,
  },
});

export default Home;
