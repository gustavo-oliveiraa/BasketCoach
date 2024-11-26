import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text, TouchableOpacity, StyleSheet, Image, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function GamesScreen() {
  const [games, setGames] = useState([]);
  const [newGame, setNewGame] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    const loadGames = async () => {
      const savedGames = await AsyncStorage.getItem('games');
      if (savedGames) setGames(JSON.parse(savedGames));
    };
    loadGames();
  }, []);

  const saveGames = async (updatedGames) => {
    setGames(updatedGames);
    await AsyncStorage.setItem('games', JSON.stringify(updatedGames));
  };

  const addOrEditGame = () => {
    if (editingIndex !== null) {
      const updatedGames = [...games];
      updatedGames[editingIndex] = newGame;
      saveGames(updatedGames);
      setEditingIndex(null);
    } else {
      saveGames([...games, newGame]);
    }
    setNewGame('');
  };

  const deleteGame = (index) => {
    const updatedGames = games.filter((_, i) => i !== index);
    saveGames(updatedGames);
  };

  return (
    <ImageBackground
      source={require('../../assets/basketball-game.png')} // Substitua pelo nome correto da sua imagem
      style={styles.background}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Jogos</Text>
        <TextInput
          style={styles.input}
          placeholder="Descrição do Jogo"
          value={newGame}
          onChangeText={setNewGame}
        />
        <TouchableOpacity
          style={styles.customButton}
          onPress={addOrEditGame}
        >
          <Text style={styles.buttonText}>
            {editingIndex !== null ? 'Editar Jogo' : 'Adicionar Jogo'}
          </Text>
        </TouchableOpacity>
        <FlatList
          data={games}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.listItem}>
              <Text style={styles.itemText}>{item}</Text>
              <View style={styles.actions}>
                <TouchableOpacity onPress={() => { setNewGame(item); setEditingIndex(index); }}>
                  <Image source={require('../../assets/edit-icon.png')} style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteGame(index)}>
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
