import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import { AuthContext } from '../store/auth-context';
import { register } from '../services/auth.service';
import useShowPassword from '../hooks/useShowPassword';
import { UserDataContext } from '../store/user-data-context';

const SignupScreen = () => {
  // HANDLERS
  const getLoginHandler = () => {
    navigation.replace('Login');
  };
  const signupSubmitHandler = async () => {
    if (!email.includes('@') || !(password.length >= 7) || !(name.length > 0)) {
      return Alert.alert(
        'Invalid input',
        'Please check your entered information.'
      );
    }

    setIsAuthenticating(true);
    try {
      const { id, token, name } = await register(name, email, password);
      authCtx.onSuccessAuth(token);
      userDataCtx.onSuccessAuth(id, name);
    } catch (err) {
      Alert.alert(
        'Authentication failed',
        'Could not sign up. Please check your credentials or try again later.'
      );
      setIsAuthenticating(false);
    }
  };

  // STATES
  const navigation = useNavigation();
  const authCtx = useContext(AuthContext);
  const userDataCtx = useContext(UserDataContext);
  const [passwordVisibility, togglePasswordVisibility] = useShowPassword();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  if (isAuthenticating) {
    return <LoadingOverlay message="Signing up..." />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
      />
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
      />
      <Text style={styles.label}>Password</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={[styles.passwordInput]}
          placeholder="Enter your password (at least 7 characters)"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!passwordVisibility}
        />
        <TouchableOpacity
          onPress={togglePasswordVisibility}
          style={styles.passwordIconContainer}
        >
          <MaterialCommunityIcons
            name={passwordVisibility ? 'eye-off' : 'eye'}
            size={24}
            color="grey"
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.signupButton}
        onPress={signupSubmitHandler}
      >
        <Text style={styles.signupButtonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={getLoginHandler}>
        <Text style={styles.alreadyButtonText}>Already have an account ?</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'top',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  title: {
    marginTop: 80,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginBottom: 5,
  },
  input: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  nameContainer: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordContainer: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordInput: {
    flex: 1,
  },
  passwordIconContainer: {
    height: '100%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alreadyButtonText: {
    fontSize: 16,
    color: 'rgba(250,100,0,1)',
  },
  signupButton: {
    height: 50,
    width: '100%',
    borderWidth: 0,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#7EAFD5',
  },
  signupButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});
export default SignupScreen;
