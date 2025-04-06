import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet ,StatusBar} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WORKOUTS_KEY = 'workouts';
<StatusBar barStyle="light-content" />
export default function ViewWorkoutScreen({ navigation }) {
  const [workouts, setWorkouts] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

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

  // Handle date change from DateTimePicker
  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setSelectedDate(selectedDate);
    }
  };

  // Filter workouts by selected date
  const filteredWorkouts = workouts.filter(
    workout => workout.date === selectedDate.toISOString().split('T')[0]
  );

  return (
    <View style={styles.container}>
      {/* Date picker button */}
      <TouchableOpacity style={styles.dateButton} onPress={() => setShowDatePicker(true)}>
        <Text style={styles.dateText}>Date: {selectedDate.toDateString()}</Text>
      </TouchableOpacity>

      {/* Date picker modal */}
      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={onChangeDate}
        />
      )}

      {/* Display workouts */}
      <FlatList
        data={filteredWorkouts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.workoutCard}>
            <Text style={styles.workoutName}>{item.name}</Text>
            <Text style={styles.workoutDetails}>
              Reps: {item.reps} | Sets: {item.sets} | Weight: {item.weight} kg
            </Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.noWorkouts}>No workouts found for this date.</Text>}
      />

      {/* Add Workout Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate('Add Workout')}
        >
          <Text style={styles.buttonText}>Add Workout</Text>
        </TouchableOpacity>

        {/* Home Button */}
        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.buttonText}>Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
    justifyContent: 'space-between', // Ensure space between content and buttons
  },
  dateButton: {
    backgroundColor: '#1DB954',
    padding: 12,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 15,
  },
  dateText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  workoutCard: {
    backgroundColor: '#1e1e1e',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  workoutName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  workoutDetails: {
    fontSize: 14,
    color: '#ccc',
    marginTop: 5,
  },
  noWorkouts: {
    color: '#ccc',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center', // Center buttons horizontally
    marginBottom: 20, // Space at the bottom
  },
  button: {
    backgroundColor: '#1DB954',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 30,
    marginVertical: 10,
    width: '90%',
    alignItems: 'center',
    elevation: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
