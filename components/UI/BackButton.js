import { StyleSheet, Text, View, Button, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { Colors } from '../../constants/colors';

export default function BackButton({ handlePress }) {
  return (
    <Pressable onPress={handlePress}>
      <Ionicons name="chevron-back" size={32} />
    </Pressable>
  );
}

const styles = StyleSheet.create({});
