import { Button } from '@rneui/themed';
import React from 'react';
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
    <Button title='ClickMe' onPress={go} type='clear'></Button>
  );
}