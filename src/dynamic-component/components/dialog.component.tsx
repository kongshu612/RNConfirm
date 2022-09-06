import React from 'react';
import { Dimensions, LayoutChangeEvent, Modal, Platform, Pressable, StyleSheet, View } from 'react-native';
import type { IModalProps } from '../model';



const calcluateY = (baseY: number, height: number, windowHeight: number) => {
  let size = baseY + height;
  if (size < windowHeight) {
    return Math.round(baseY < 0 ? 0 : baseY);
  } else {
    size = windowHeight - height;
    return size < 0 ? 0 : Math.round(size);
  }
}

const calculateX = (baseX: number, width: number, windowWidth: number) => {
  let size = baseX + width;
  if (size < windowWidth) {
    return Math.round(baseX < 0 ? 0 : baseX);
  } else {
    size = windowWidth - width;
    return size < 0 ? 0 : Math.round(size);
  }
}

const Dialog: React.FC<IModalProps> = (props) => {
  let { visible,
    onDropbackPress,
    children,
    containerStyle = {},
    overlayStyle = {},
    drawBackStyle = {},
    position = 'center',
    relativeToElementRef,
    relativePoint,
    alignPoint } = props;
  let positionStyle = {};
  const [align, setAlign] = React.useState<{ left: number, top: number } | null>(null);
  const { height: WINDOWHEIGHT, width: WINDOWWIDTH } = Dimensions.get('window');
  if (relativeToElementRef || relativePoint) {
    if (['center', 'top', 'bottom'].includes(position)) {
      position = 'auto';
    }
    if (!alignPoint) {
      alignPoint = relativePoint ? 'center' : 'left';
    }
  }
  if (position === 'auto' && !relativeToElementRef && !relativePoint) {
    console.warn(`please provide the releative elemnet Ref when postion is auto`);
    position = 'center';
  }
  const autoPositionStyle = React.useMemo(() => {
    if (align) {
      return {
        left: align.left,
        top: align.top,
        position: 'absolute',
      };
    } else {
      return {
        opacity: 0,
      }
    }
  }, [align]);

  switch (position) {
    case 'top': positionStyle = styles.top; break;
    case 'bottom': positionStyle = styles.bottom; break;
    case 'auto': positionStyle = autoPositionStyle; break;
  }

  const calcuateLayout = React.useCallback(async (event: LayoutChangeEvent) => {
    console.log('invoke onlayout');
    const { width, height } = event.nativeEvent.layout;
    if (relativePoint) {
      let { x: relativeX, y: relativeY } = relativePoint;
      switch (alignPoint) {
        case 'center': relativeX -= width / 2; break;
        case 'right': relativeX -= width; break;
      }
      let left = calculateX(relativeX, width, WINDOWWIDTH);
      let top = calcluateY(relativeY, height, WINDOWHEIGHT);
      setAlign({ left, top });
    } else if (relativeToElementRef?.current) {
      const result = new Promise<number[]>((resolve) => {
        (relativeToElementRef!.current as any).measureInWindow((...args: number[]) => resolve(args));
      });
      let [relativeX, relativeY, , relativeHeight] = await result;
      switch (alignPoint) {
        case 'center': relativeX! -= width / 2; break;
        case 'right': relativeX! -= width; break;
      }
      let left = calculateX(relativeX!, width, WINDOWWIDTH);
      let top = relativeY! + relativeHeight!;
      if (top + height > WINDOWHEIGHT) {
        top = relativeY! - height;
        top = top < 0 ? 0 : top;
      }
      top = Math.round(top);
      setAlign({ left, top });
    }
  }, [WINDOWHEIGHT, WINDOWHEIGHT, relativePoint, relativeToElementRef?.current, setAlign,]);

  console.log(positionStyle);

  return (
    <Modal visible={visible} transparent onRequestClose={onDropbackPress}>
      <Pressable onPress={onDropbackPress} style={[styles.drawback, drawBackStyle]} />
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