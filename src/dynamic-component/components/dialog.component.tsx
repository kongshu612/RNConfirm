import React from 'react';
import { Dimensions, LayoutChangeEvent, Modal, Platform, Pressable, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';


export interface IModalProps {
  visible: boolean;
  onDropbackPress?: () => void;
  children?: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  overlayStyle?: StyleProp<ViewStyle>;
  position?: 'center' | 'top' | 'bottom' | 'auto';
  relativeToElementRef?: React.MutableRefObject<React.ReactNode>;
}
const Dialog: React.FC<IModalProps> = (props) => {
  let { visible, onDropbackPress, children, containerStyle = {}, overlayStyle = {}, position = 'center', relativeToElementRef } = props;
  let positionStyle = {};
  const [top, setTop] = React.useState<number>(-1);
  const { height: WINDOWHEIGHT } = Dimensions.get('window');
  if (relativeToElementRef) {
    if (['center', 'top', 'bottom'].includes(position)) {
      console.warn(`auto mode will be supported when relative element provided`);
      position = 'auto';
    }
  }
  if (position === 'auto' && !relativeToElementRef) {
    console.error(`please provide the releative elemnet Ref when postion is auto`);
    position = 'center';
  }
  const autoPositionStyle = React.useMemo(() => {
    if (top !== -1) {
      return {
        top: top,
        position: 'absolute',
      };
    } else {
      return {
        opacity: 0,
      }
    }
  }, [top]);

  switch (position) {
    case 'top': positionStyle = styles.top; break;
    case 'bottom': positionStyle = styles.bottom; break;
    case 'auto': positionStyle = autoPositionStyle; break;
  }
  const calcuateLayout = React.useCallback(async (event: LayoutChangeEvent) => {
    const { x, y, width, height } = event.nativeEvent.layout;
    console.log(`the x is ${x}, y is ${y} height is ${height}, width is ${width}`);
    if (relativeToElementRef?.current) {
      const result = new Promise<number[]>((resolve) => {
        (relativeToElementRef!.current as any).measureInWindow((...args: number[]) => resolve(args));
      });
      let [, relativeY, , relativeHeight] = await result;
      const size = relativeY! + relativeHeight! + height;
      if (size < WINDOWHEIGHT) {
        setTop(relativeY! + relativeHeight!);
      } else {
        setTop(Math.min(0, relativeY! - height));
      }
    }
  }, [WINDOWHEIGHT, setTop]);


  return (
    <Modal visible={visible} transparent onRequestClose={onDropbackPress}>
      <Pressable onPress={onDropbackPress} style={styles.drawback} />
      <View style={[styles.container, containerStyle]}>
        <View style={[styles.overlay, positionStyle, overlayStyle]} onLayout={calcuateLayout}>
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
  bottom: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  top: {
    position: 'absolute',
    top: 0,
    width: '100%',
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