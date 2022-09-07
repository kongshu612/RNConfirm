import React from 'react';
import { Dimensions, LayoutChangeEvent, Modal, Platform, Pressable, StyleSheet, View } from 'react-native';
import type { IModalProps } from '../model';



const calcluateY = (baseY: number, height: number, windowHeight: number, heightPadding: number = 20) => {
  let size = baseY + height + heightPadding;
  if (size < windowHeight) {
    return Math.round(baseY < 0 ? heightPadding : baseY);
  } else {
    size = baseY - height;
    if (size >= heightPadding) {
      return Math.round(size);
    }
    size = windowHeight - height - heightPadding;
    return size < 0 ? heightPadding : Math.round(size);
  }
}

const calculateX = (baseX: number, width: number, windowWidth: number, widthPadding: number = 5) => {
  let size = baseX + width + widthPadding;
  if (size < windowWidth) {
    return Math.round(baseX < 0 ? widthPadding : baseX);
  } else {
    size = windowWidth - width - widthPadding;
    return size < 0 ? widthPadding : Math.round(size);
  }
}

const positionGap = 5;

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
    alignPoint,
    screenPadding = {}
  } = props;
  let positionStyle = {};
  const { widthPadding = 5, heightPadding = 20 } = screenPadding;
  const [align, setAlign] = React.useState<{ left: number, top: number } | null>(null);
  const alignRef = React.useRef<{ left: number, top: number } | null>(align);
  const opacityRef = React.useRef<number>(0);
  alignRef.current = align;
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
        opacity: opacityRef.current,
      };
    } else {
      return {
        opacity: 0,
      }
    }
  }, [align, opacityRef.current]);

  switch (position) {
    case 'top': positionStyle = styles.top; break;
    case 'bottom': positionStyle = styles.bottom; break;
    case 'auto': positionStyle = autoPositionStyle; break;
  }

  const calcuateLayout = React.useCallback(async (event: LayoutChangeEvent) => {
    const { width, height, x, y } = event.nativeEvent.layout;
    console.log(`the popup element size is x:${x}, y:${y}, width:${width},height:${height}`);
    const pre = alignRef.current;
    if (relativePoint) {
      let { x: relativeX, y: relativeY } = relativePoint;
      switch (alignPoint) {
        case 'center': relativeX -= width / 2; break;
        case 'right': relativeX -= width; break;
      }
      let left = calculateX(relativeX, width, WINDOWWIDTH, widthPadding);
      let top = calcluateY(relativeY, height, WINDOWHEIGHT, heightPadding);
      if (Math.abs(left - (pre?.left || 0)) > positionGap || Math.abs(top - (pre?.top || 0)) > positionGap) {
        setAlign({ left, top });
      } else if (opacityRef.current === 0) {
        opacityRef.current = 1;
        setAlign(pre ? { ...pre } : pre);
      }
    } else if (relativeToElementRef?.current) {
      const result = new Promise<number[]>((resolve) => {
        (relativeToElementRef!.current as any).measureInWindow((...args: number[]) => resolve(args));
      });
      let [relativeX, relativeY, , relativeHeight] = await result;
      switch (alignPoint) {
        case 'center': relativeX! -= width / 2; break;
        case 'right': relativeX! -= width; break;
      }
      let left = calculateX(relativeX!, width, WINDOWWIDTH, widthPadding);
      let top = relativeY! + relativeHeight!;
      if (top + height + heightPadding > WINDOWHEIGHT) {
        top = relativeY! - height;
        top = top < 0 ? heightPadding : top;
      }
      top = Math.round(top);
      if (Math.abs(left - (pre?.left || 0)) > positionGap || Math.abs(top - (pre?.top || 0)) > positionGap) {
        setAlign({ left, top });
      } else if (opacityRef.current === 0) {
        opacityRef.current = 1;
        setAlign(pre ? { ...pre } : pre);
      }
    }
  }, [WINDOWHEIGHT, WINDOWHEIGHT, relativePoint, relativeToElementRef?.current, setAlign, widthPadding, heightPadding]);

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