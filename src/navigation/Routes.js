import React, { useState, useEffect, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import AuthStack from './AuthStack';
import HomeStack from './HomeStack';
import { AuthContext } from './AuthProvider';
import Loading from '../components/Loading';

export default function Routes() {

  const { user, setUser } = useContext(AuthContext);
  // console.log('user from Context state :');
  // console.log(user);
  const [loading, setLoading] = useState(true);
  const [initializing, setInitializing] = useState(true);

  // Handle user state changes
  function onAuthStateChangedFun(userObj) {
    // console.log('onAuthStateChangedFun');
    // console.log(userObj);
    setUser(userObj);
    if (initializing) setInitializing(false);
    setLoading(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChangedFun);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (loading) {
    return <Loading />;
  }

  // console.log(typeof(user));
  // console.log(user);
  return (
    <NavigationContainer>
      { user ? <HomeStack /> : <AuthStack /> }
    </NavigationContainer>
  );
}