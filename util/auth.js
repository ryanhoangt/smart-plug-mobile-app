import axios from 'axios';
import { FIREBASE_API_KEY } from '@env';

// mode: "signUp" || "signInWithPassword"
async function authenticate(mode, email, password) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${FIREBASE_API_KEY}`;

  const resp = await axios.post(url, {
    email,
    password,
    returnSecureToken: true,
  });

  const token = resp.data.idToken;
  return token;
}

export function createUser(email, password) {
  return authenticate('signUp', email, password);
}

export function login(email, password) {
  return authenticate('signInWithPassword', email, password);
}
