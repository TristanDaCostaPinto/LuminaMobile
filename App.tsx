import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import Router from './router';

if(__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'));
}

export default function App() {
  return(
    <NavigationContainer tabBarOptions={{
      activeBackgroundColor: '#298EA6',
      inactiveBackgroundColor: '#47A8BD',
      activeTintColor: "white",
      inactiveTintColor: "white"
    }}>
      <Router />
    </NavigationContainer>
    
  )
}
