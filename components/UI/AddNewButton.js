import { Button, StyleSheet, View } from 'react-native';
import { Colors } from '../../constants/colors';

function AddNewButton({ onBtnPress, style }) {
  return (
    <View style={[styles.addBtn, style]}>
      <Button
        onPress={onBtnPress}
        title="+ Add new scenario"
        accessibilityLabel="Add new scenario"
        color={Colors.orangePrimary}
      />
    </View>
  );
}

export default AddNewButton;

const styles = StyleSheet.create({
  addBtn: {
    margin: 6,
    marginTop: 15,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderStyle: 'dotted',
    borderColor: Colors.orangePrimary,
    color: Colors.orangePrimary,
    borderRadius: 6,
  },
});
