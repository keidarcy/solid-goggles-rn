import React, { useCallback, useEffect } from 'react';
import { createContext } from 'react';
import { MoodOptionWithTimestamp, MoodOptionType } from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AppContextType = {
  moodList: MoodOptionWithTimestamp[];
  handleSelectMood: (selectedMood: MoodOptionType) => void;
};

type AppData = {
  moodList: MoodOptionWithTimestamp[];
};

const dataKey = 'my-app-data';

const setAppData = async (appData: AppData): Promise<void> => {
  try {
    await AsyncStorage.setItem(dataKey, JSON.stringify(appData));
  } catch (error) {
    console.log(error);
  }
};

const getAppData = async (): Promise<AppData> => {
  try {
    const data = await AsyncStorage.getItem(dataKey);
    if (data) {
      return JSON.parse(data);
    }
  } catch (error) {
    console.log(error);
  }
  return { moodList: [] };
};

const AppContext = createContext<AppContextType>({
  moodList: [],
  handleSelectMood: () => {},
});

export const AppProvider: React.FC = ({ children }) => {
  const [moodList, setMoodList] = React.useState<MoodOptionWithTimestamp[]>([]);
  const handleSelectMood = useCallback((selectedMood: MoodOptionType) => {
    setMoodList(prevMoodList => {
      const newMoodList = [
        ...prevMoodList,
        { mood: selectedMood, timestamp: Date.now() },
      ];
      setAppData({ moodList: newMoodList });
      return newMoodList;
    });
  }, []);

  useEffect(() => {
    const fn = async () => {
      const appData = await getAppData();
      setMoodList(appData.moodList);
    };
    fn();
  }, []);
  return (
    <AppContext.Provider value={{ moodList, handleSelectMood }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => React.useContext(AppContext);
