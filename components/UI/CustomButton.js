import { Pressable, StyleSheet, Switch, Text, View } from 'react-native';
import React from 'react';
import { Colors } from '../../constants/colors';

export default function CustomButton({
  title,
  first,
  last,
  primary,
  value,
  onValueChange,
}) {
  return (
    <Pressable
      style={[
        styles.btnContainer,
        first ? styles.first : undefined,
        last ? styles.last : undefined,
      ]}>
      <Text style={[styles.text, primary ? styles.primary : undefined]}>
        {title}
      </Text>
      {value !== undefined && onValueChange && (
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{true: Colors.orangePrimary}}
        />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btnContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grayPrimary,
  },
  first: {
    borderTopStartRadius: 12,
    borderTopRightRadius: 12,
  },
  last: {
    borderBottomStartRadius: 12,
    borderBottomRightRadius: 12,
    borderBottomWidth: 0,
  },
  text: {
    fontWeight: '500',
    fontSize: 16,
  },
  primary: {
    color: Colors.orangePrimary,
  },
});
