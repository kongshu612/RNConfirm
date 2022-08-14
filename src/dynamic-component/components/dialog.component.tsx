import React from 'react';
import { Modal, Platform, Pressable, StyleSheet, View } from 'react-native';


export interface IModalProps {
  visible: boolean;
  onDropbackPress?: () => void;
  children?: React.ReactNode;
}
const Dialog: React.FC<IModalProps> = (props) => {
  const { visible, onDropbackPress, children } = props;
  return (
    <Modal visible={visible} transparent onRequestClose={onDropbackPress}>
      <Pressable onPress={onDropbackPress} style={styles.drawback} />
      <View style={styles.container}>
        <View style={styles.overlay}>
          {children}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  drawback: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullscreen: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    backgroundColor: 'white',
    borderRadius: 3,
    padding: 10,
    ...Platform.select({
      android: {
        elevation: 2,
      },
      default: {
        shadowColor: 'rgba(0, 0, 0, .3)',
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 4,
      },
    }),
  },
});

export default Dialog;