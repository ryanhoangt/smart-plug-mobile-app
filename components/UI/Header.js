import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { Colors } from '../../constants/colors';

const avatar = require('../../assets/images/avatar-placeholder.jpg');

function Header({ title }) {
  return (
    <View style={styles.headerBar}>
      <Text style={styles.headerTitle}>{title}</Text>
      <Image source={avatar} style={styles.avatar} />
    </View>
  );
}

const styles = StyleSheet.create({
  headerBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  headerTitle: {
    color: Colors.orangePrimary,
    fontSize: 32,
    fontWeight: 'bold',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
});

export default Header;
