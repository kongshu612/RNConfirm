import React from 'react';
import { GestureResponderEvent, Text, TouchableOpacity } from 'react-native';
import { useComponent } from 'rn-portal-confirm';


export const PositionDemo: React.FC = () => {
  const open = useComponent();
  const openComponent = React.useCallback((event: GestureResponderEvent) => {
    let { pageX: x, pageY: y } = event.nativeEvent;
    open(<Text>Hello Dialog</Text>, { relativePoint: { x, y }, drawBackStyle: { backgroundColor: 'transparent' } });

  }, [open]);
  return (
    <TouchableOpacity onPress={openComponent} style={{ marginTop: 20 }}>
      <Text style={{ color: '#2089dc' }}>Dialog Open Align to Click Point</Text>
    </TouchableOpacity>
  )
}