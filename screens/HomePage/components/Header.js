import { View, Text, Pressable, StyleSheet, Image } from 'react-native';
import useTimer from '../../../hooks/useTimer';
import { useContext } from 'react';
import { AuthContext } from '../../../store/auth-context';
import { UserContext } from '../../../store/userContext';
const avatarImg = require('../../../assets/images/avatar-placeholder.jpg');

function Header() {
  const timeString = useTimer();
  const { user, onLogout } = useContext(AuthContext);

  return (
    <View style={styles.welcomeHeading}>
      <View style={styles.headingTextContainer}>
        <Text style={{ color: '#9BA4B0' }}>{timeString}</Text>
        <Text style={[styles.welcomeText, { fontWeight: 800 }]}>
          Welcome, {user?.name}
        </Text>
      </View>
      <Pressable style={styles.avatarImg} onPress={() => onLogout()}>
        <Image source={avatarImg} style={styles.avatarImg} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  welcomeHeading: {
    // backgroundColor: "green",
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    marginTop: 10,
  },
  headingTextContainer: {},
  avatarImg: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  sectionText: {
    fontFamily: 'open-sans-bold',
    fontSize: 24,
    color: 'rgba(30, 41, 51, 0.7)',
  },
  welcomeText: {
    fontFamily: 'epilogue-700',
    fontWeight: 'bold',
    fontSize: 24,
    marginTop: 5,
  },
  avatarImg: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
});
export default Header;
