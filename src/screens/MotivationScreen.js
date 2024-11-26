import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import useMotivation from '../hooks/useMotivation';

export default function MotivationScreen() {
  const phrase = useMotivation();

  return (
    <ImageBackground
      source={require('../../assets/motivation-background.png')}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Motivação Diária</Text>
        <Text style={styles.phrase}>{phrase}</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, resizeMode: 'cover' },
  overlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#fff', marginBottom: 20, textAlign: 'center' },
  phrase: { fontSize: 20, color: '#fff', fontStyle: 'italic', textAlign: 'center', lineHeight: 28 },
});
