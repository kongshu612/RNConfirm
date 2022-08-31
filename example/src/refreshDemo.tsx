import React from 'react';
import { Button, Text, TouchableOpacity, View } from 'react-native';
import { useComponent } from 'rn-portal-confirm';

export const RefreshDialog: React.FC<{ text: string, confirm: () => void }> = ({ text, confirm }) => {
  return (
    <View>
      <Text>Hello, Note, Text Bellow will be changed after 3 seconds</Text>
      <Text style={{ color: 'red' }}>{text}</Text>
      <View style={{ marginTop: 20 }}>
        <Button title='Close Me' onPress={confirm}></Button>
      </View>
    </View>
  );

}

export const RefreshDemo: React.FC = () => {
  const open = useComponent();
  const buttonRef = React.useRef(null);
  const openComponent = React.useCallback(() => {
    let componentRef: ReturnType<typeof open>;
    const confirm = () => {
      componentRef?.close();
    }
    componentRef = open(<RefreshDialog text='Hello World' confirm={confirm} />, { position: 'auto', relativeToElementRef: buttonRef });
    setTimeout(() => {
      componentRef.update(<RefreshDialog text='Hello World Changed' confirm={confirm} />, { position: 'auto', relativeToElementRef: buttonRef });
    }, 3000)
  }, [open]);
  return (
    <TouchableOpacity onPress={openComponent} style={{ marginTop: 20 }} ref={buttonRef}>
      <Text style={{ color: '#2089dc' }}>Refresh Modal Demo</Text>
    </TouchableOpacity>
  )
}