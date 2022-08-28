import React from 'react';
import { Button, Text, TouchableOpacity, View } from 'react-native';
import { useComponent } from 'react-native-confirm';



export const OpenComponent: React.FC = () => {
  const open = useComponent();
  const buttonRef = React.useRef(null);
  const openComponent = React.useCallback(() => {
    let componentRef: ReturnType<typeof open>;
    const confirm = () => {
      componentRef?.close();
    }
    const component = (
      <View>
        <Text>Hello, I am a custom Component</Text>
        <View style={{ marginTop: 20 }}>
          <Button title='Close Me' onPress={confirm}></Button>
        </View>
      </View>
    );
    componentRef = open(component, { position: 'auto', relativeToElementRef: buttonRef });
  }, [open]);
  return (
    <TouchableOpacity onPress={openComponent} style={{ marginTop: 20 }} ref={buttonRef}>
      <Text style={{ color: '#2089dc' }}>open component from bottom</Text>
    </TouchableOpacity>
  )
}