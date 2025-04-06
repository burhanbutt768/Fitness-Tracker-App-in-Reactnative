import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WORKOUTS_KEY = 'workouts';

export default function AddWorkoutScreen({ navigation }) {
  const [workoutName, setWorkoutName] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [reps, setReps] = useState('');
  const [sets, setSets] = useState('');
  const [weight, setWeight] = useState('');
  const [showViewWorkouts, setShowViewWorkouts] = useState(false);

  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const addWorkout = async () => {
    if (workoutName && reps && sets && weight) {
      const newWorkout = {
        id: Date.now().toString(),
        name: workoutName,
        date: date.toISOString().split('T')[0],
        reps,
        sets,
        weight,
      };

      // Retrieve existing workouts from AsyncStorage
      const storedWorkouts = await AsyncStorage.getItem(WORKOUTS_KEY);
      let workouts = storedWorkouts ? JSON.parse(storedWorkouts) : [];

      // Add the new workout to the list
      workouts.push(newWorkout);

      // Save the updated workouts array back to AsyncStorage
      await AsyncStorage.setItem(WORKOUTS_KEY, JSON.stringify(workouts));

      setShowViewWorkouts(true);
      setWorkoutName('');
      setReps('');
      setSets('');
      setWeight('');
    }
  };

  return (
    <View style={styles.container}>
      {/* Home Button */}
      <TouchableOpacity 
        style={styles.homeButton} 
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.buttonText}>Home</Text>
      </TouchableOpacity>

      <Text style={styles.header}>Add Workout</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Workout Name" 
        placeholderTextColor="#ccc"
        value={workoutName} 
        onChangeText={setWorkoutName} 
      />
      <TouchableOpacity style={styles.input} onPress={() => setShowDatePicker(true)}>
        <Text style={{ color: '#fff', fontSize: 16 }}>{date.toDateString()}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onChangeDate}
        />
      )}
      <TextInput 
        style={styles.input} 
        placeholder="Reps" 
        placeholderTextColor="#ccc"
        keyboardType="numeric" 
        value={reps} 
        onChangeText={setReps} 
      />
      <TextInput 
        style={styles.input} 
        placeholder="Sets" 
        placeholderTextColor="#ccc"
        keyboardType="numeric" 
        value={sets} 
        onChangeText={setSets} 
      />
      <TextInput 
        style={styles.input} 
        placeholder="Weight (kg)" 
        placeholderTextColor="#ccc"
        keyboardType="numeric" 
        value={weight} 
        onChangeText={setWeight} 
      />
      <TouchableOpacity style={styles.button} onPress={addWorkout}>
        <Text style={styles.buttonText}>Save Workout</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.viewButton} onPress={() => navigation.navigate('View Workout')}>
        <Text style={styles.buttonText}>View Workouts</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
    padding: 20,
  },
  homeButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 30,
    marginBottom: 20,
    width: '90%',
    alignItems: 'center',
    elevation: 5,
    marginTop: 20, // Ensure the button is not stuck to the top edge
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
  },
  input: {
    width: '90%',
    backgroundColor: '#1e1e1e',
    color: '#ffffff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
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
  viewButton: {
    backgroundColor: '#ff9800',
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
