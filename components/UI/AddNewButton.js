import { Button, StyleSheet, View } from 'react-native';
import { Colors } from '../../constants/colors';

function AddNewButton({ onBtnPress, style, btnText }) {
  return (
    <View style={[styles.addBtn, style]}>
      <Button
        onPress={onBtnPress}
        title={`+ ${btnText}`}
        accessibilityLabel={btnText}
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
