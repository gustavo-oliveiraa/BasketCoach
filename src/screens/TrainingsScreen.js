import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text, TouchableOpacity, StyleSheet, Image, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TrainingsScreen() {
  const [trainings, setTrainings] = useState([]);
  const [newTraining, setNewTraining] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    const loadTrainings = async () => {
      const savedTrainings = await AsyncStorage.getItem('trainings');
      if (savedTrainings) setTrainings(JSON.parse(savedTrainings));
    };
    loadTrainings();
  }, []);

  const saveTrainings = async (updatedTrainings) => {
    setTrainings(updatedTrainings);
    await AsyncStorage.setItem('trainings', JSON.stringify(updatedTrainings));
  };

  const addOrEditTraining = () => {
    if (editingIndex !== null) {
      const updatedTrainings = [...trainings];
      updatedTrainings[editingIndex] = newTraining;
      saveTrainings(updatedTrainings);
      setEditingIndex(null);
    } else {
      saveTrainings([...trainings, newTraining]);
    }
    setNewTraining('');
  };

  const deleteTraining = (index) => {
    const updatedTrainings = trainings.filter((_, i) => i !== index);
    saveTrainings(updatedTrainings);
  };

  return (
    <ImageBackground
      source={require('../../assets/basketball-court.png')} // Caminho da sua imagem de fundo
      style={styles.background}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Treinos</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome do Treino"
          value={newTraining}
          onChangeText={setNewTraining}
        />
        <TouchableOpacity
          style={styles.customButton}
          onPress={addOrEditTraining}
        >
          <Text style={styles.buttonText}>
            {editingIndex !== null ? 'Editar Treino' : 'Adicionar Treino'}
          </Text>
        </TouchableOpacity>
        <FlatList
          data={trainings}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.listItem}>
              <Text style={styles.itemText}>{item}</Text>
              <View style={styles.actions}>
                <TouchableOpacity onPress={() => { setNewTraining(item); setEditingIndex(index); }}>
                  <Image source={require('../../assets/edit-icon.png')} style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteTraining(index)}>
                  <Image source={require('../../assets/delete-icon.png')} style={styles.icon} />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
    </ImageBackground>

  );
}

const styles = StyleSheet.create({
  background: { flex: 1, resizeMode: 'cover', },
  overlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: 20, },
  title: { fontSize: 24, fontWeight: 'bold', color: '#fff', marginBottom: 10, textAlign: 'center', },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 10, marginBottom: 10, borderRadius: 5, backgroundColor: '#fff', },
  listItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, borderBottomWidth: 1, borderColor: '#ddd', backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: 5, marginBottom: 10, },
  itemText: { flex: 1, fontSize: 16, color: '#333', paddingRight: 10, flexWrap: 'wrap', },
  actions: { flexDirection: 'row', },
  icon: { width: 34, height: 44, marginHorizontal: 5 },
  customButton: { backgroundColor: '#ff6f00', paddingVertical: 15, paddingHorizontal: 20, borderRadius: 10, alignItems: 'center', marginBottom: 15, },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold', },
});

