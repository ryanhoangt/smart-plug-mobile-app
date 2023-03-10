import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { Colors } from '../../constants/colors';
import { SafeAreaView } from 'react-native-safe-area-context'
import BackButton from './BackButton';

const avatar = require('../../assets/images/avatar-placeholder.jpg');

function Header({ title, left }) {
  return (
    <SafeAreaView edges={["top", "left", "right"]}>
      <View style={styles.headerBar}>
        <View style={styles.headerLeft}>
          {left}
          {/* <BackButton /> */}
          <Text style={styles.headerTitle}>{title}</Text>
        </View>
        <Image source={avatar} style={styles.avatar} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerBar: {
    // height: 80,
    paddingHorizontal: 12,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  headerLeft: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
