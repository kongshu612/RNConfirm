
import * as React from 'react';

import { StyleSheet, View } from 'react-native';
import { PortalProvider } from 'rn-portal-confirm';
import { Demo } from './demo';
import { OpenComponent } from './openComponent';
import { PositionDemo } from './positionDemo';
import { RefreshDemo } from './refreshDemo';

export default function App() {
  return (
    <PortalProvider>
      <View style={styles.container}>
        <Demo />
        <OpenComponent />
        <RefreshDemo />
        <PositionDemo />
      </View>
    </PortalProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
