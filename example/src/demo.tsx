import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useConfirm } from 'react-native-confirm';

export const Demo: React.FC = () => {
  const confirm = useConfirm();
  const go = () => {
    confirm({
      dimissOnBackdropClick: false,
      title: 'Warning',
      message: 'Are you sure to continue?',
      ok: (closeMe) => { closeMe(); },
      cancel: (closeMe) => { closeMe(); },
    })
  }

  return (
    <TouchableOpacity onPress={go}><Text style={{ color: '#2089dc' }}>Click Me to open confirm</Text></TouchableOpacity>
  );
}