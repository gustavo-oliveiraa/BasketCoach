import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text, TouchableOpacity, StyleSheet, Image, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PlayersScreen() {
  const [players, setPlayers] = useState([]);
  const [newPlayer, setNewPlayer] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    const loadPlayers = async () => {
      const savedPlayers = await AsyncStorage.getItem('players');
      if (savedPlayers) setPlayers(JSON.parse(savedPlayers));
    };
    loadPlayers();
  }, []);

  const savePlayers = async (updatedPlayers) => {
    setPlayers(updatedPlayers);
    await AsyncStorage.setItem('players', JSON.stringify(updatedPlayers));
  };

  const addOrEditPlayer = () => {
    if (editingIndex !== null) {
      const updatedPlayers = [...players];
      updatedPlayers[editingIndex] = newPlayer;
      savePlayers(updatedPlayers);
      setEditingIndex(null);
    } else {
      savePlayers([...players, newPlayer]);
    }
    setNewPlayer('');
  };

  const deletePlayer = (index) => {
    const updatedPlayers = players.filter((_, i) => i !== index);
    savePlayers(updatedPlayers);
  };

  return (
    <ImageBackground
      source={require('../../assets/basketball-players-orange.png')} // Atualize com o nome correto da imagem
      style={styles.background}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Jogadores</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome do Jogador"
          value={newPlayer}
          onChangeText={setNewPlayer}
        />
        <TouchableOpacity
          style={styles.customButton}
          onPress={addOrEditPlayer}
        >
          <Text style={styles.buttonText}>
            {editingIndex !== null ? 'Editar Jogador' : 'Adicionar Jogador'}
          </Text>
        </TouchableOpacity>
        <FlatList
          data={players}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.listItem}>
              <Text style={styles.itemText}>{item}</Text>
              <View style={styles.actions}>
                <TouchableOpacity onPress={() => { setNewPlayer(item); setEditingIndex(index); }}>
                  <Image source={require('../../assets/edit-icon.png')} style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deletePlayer(index)}>
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
  background: { flex: 1, resizeMode: 'cover' },
  overlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#fff', marginBottom: 10, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 10, marginBottom: 10, borderRadius: 5, backgroundColor: '#fff' },
  customButton: { backgroundColor: '#ff6f00', paddingVertical: 15, paddingHorizontal: 20, borderRadius: 10, alignItems: 'center', marginBottom: 15 },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  listItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, borderBottomWidth: 1, borderColor: '#ddd', backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: 5, marginBottom: 10 },
  itemText: { flex: 1, fontSize: 16, color: '#333', paddingRight: 10, flexWrap: 'wrap', lineHeight: 20 },
  actions: { flexDirection: 'row' },
  icon: { width: 34, height: 44, marginHorizontal: 5 },
});

