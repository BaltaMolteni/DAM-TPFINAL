import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

interface InfoButtonProps {
  onPress: () => void;
}

const InfoButton: React.FC<InfoButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.infoButton} onPress={onPress}>
      <FontAwesome name="question-circle" size={28} color="#4A90E2" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  infoButton: {
    position: 'absolute',
    top: 100,
    right: 20,
    backgroundColor: 'white',
    width: 48,
    height: 48,
    borderRadius: 24,
    zIndex: 2,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default InfoButton;
