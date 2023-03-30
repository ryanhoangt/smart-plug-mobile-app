import React, { useContext, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { login } from '../util/auth';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import { AuthContext } from '../store/auth-context';

const LoginScreen = () => {
  // HANDLERS
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const getSignupHandler = () => {
    navigation.replace('Signup');
  };
  const loginSubmitHandler = async () => {
    if (!email.includes('@') || !(password.length >= 7)) {
      return Alert.alert(
        'Invalid input',
        'Please check your entered credentials.'
      );
    }

    setIsAuthenticating(true);
    try {
      const token = await login(email, password);
      authCtx.onSuccessAuth(token);
    } catch (err) {
      Alert.alert(
        'Authentication failed',
        'Could not login. Please check your credentials or try again later.'
      );
      setIsAuthenticating(false);
    }
  };

  // STATES
  const navigation = useNavigation();
  const authCtx = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging in..." />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
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
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity
          onPress={handleShowPassword}
          style={styles.passwordIconContainer}
        >
          <MaterialCommunityIcons
            name={showPassword ? 'eye-off' : 'eye'}
            size={24}
            color="grey"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.daddy}>
        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.loginButton} onPress={loginSubmitHandler}>
        <Text style={styles.loginButtonText}>Log in</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={getSignupHandler}>
        <Text style={styles.signupButtonText}>Not a member? Sign up now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'top',
    alignItems: 'center',
    paddingHorizontal: 30,
    backgroundColor: '#fff',
  },
  title: {
    marginTop: 80,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
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
    marginBottom: 20,
  },
  passwordContainer: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
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
  daddy: {
    alignSelf: 'flex-start',
  },
  forgotPassword: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'grey',
    marginBottom: 30,
  },

  signupButtonText: {
    fontSize: 16,
    color: 'rgba(250,100,0,1)',
  },
  loginButton: {
    height: 50,
    width: '100%',
    borderWidth: 0,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#7EAFD5',
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});
export default LoginScreen;
