import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WORKOUTS_KEY = 'workouts';

export default function HomeScreen({ navigation }) {
  const [workouts, setWorkouts] = useState([]);

  // Load workouts from AsyncStorage when the component mounts
  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        const storedWorkouts = await AsyncStorage.getItem(WORKOUTS_KEY);
        if (storedWorkouts) {
          setWorkouts(JSON.parse(storedWorkouts));
        }
      } catch (error) {
        console.error('Error loading workouts', error);
      }
    };

    loadWorkouts();
  }, []);

  return (
    <ImageBackground 
      source={require('../assets/background.jpg')} // Add the correct image path
      style={styles.container} 
      imageStyle={styles.backgroundImage}
    >
      <Text style={styles.header}>Fitness Tracker</Text>

      {/* Navigate to Add Workout Screen */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Add Workout')}>
        <Text style={styles.buttonText}>Add Workout</Text>
      </TouchableOpacity>

      {/* Navigate to View Workout Screen */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('View Workout')}>
        <Text style={styles.buttonText}>View Workouts</Text>
      </TouchableOpacity>

      {/* Display saved workouts on Home Screen */}
      {/* {workouts.length > 0 ? (
        workouts.map((workout, index) => (
          <Text key={index} style={styles.item}>{workout}</Text>
        ))
      ) : (
        <Text style={styles.item}>No workouts added yet.</Text>
      )} */}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  backgroundImage: {
    opacity: 0.8, // Adjust opacity to make the image more subtle
    resizeMode: 'cover',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#1DB954',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 30,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
    elevation: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  item: {
    fontSize: 18,
    color: '#ffffff',
    marginTop: 10,
  },
});
