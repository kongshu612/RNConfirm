import React from 'react';
import { Dialog } from '@rneui/themed';
import type { ConfirmProps, DynamicComponentProps } from '../model/model';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { Button } from '@rneui/themed';



export const ModalWrapperComponnet: React.FC<DynamicComponentProps> = (params) => {
  const { Component, props = {}, dimissOnBackdropClick = true, closeMe } = params;
  const onBackdropClick = React.useCallback(() => {
    if (dimissOnBackdropClick) {
      closeMe();
    }
  }, [dimissOnBackdropClick, closeMe])
  return (
    <Dialog isVisible={true} onBackdropPress={onBackdropClick}>
      <Component {...props} closeMe={closeMe} />
    </Dialog>
  );
}

export const ConfirmDialog: React.FC<Omit<ConfirmProps, 'dimissOnBackdropClick'> & { closeMe: () => void }> = (props) => {
  const { title = 'Confirm', message = 'Are you sure?', ok, cancel, okText = 'Yes', cancelText = 'No', hideCancel = false, closeMe } = props;
  const onOk = React.useCallback(() => {
    if (ok) {
      ok(closeMe);
    }
  }, [ok, closeMe]);

  const onCancel = React.useCallback(() => {
    if (cancel) {
      cancel(closeMe);
    }
  }, [cancel, closeMe]);
  return (
    <View>
      <View style={[styles.titleContainer]}>
        {typeof (title) === 'string' ? <Text style={[styles.titleStyle]}>{title}</Text> : title}
      </View>
      <View>
        {typeof (message) === 'string' ? <Text style={[styles.fontBase]}>{message}</Text> : message}
      </View>
      <View style={[styles.buttonContainerStyle]}>
        {
          typeof (okText) === 'string' ?
            <Button onPress={onOk} title={okText}
              titleStyle={[styles.fontBase]}
              buttonStyle={[styles.buttonStyle]}
              containerStyle={[styles.okButtonBackground]} /> :
            <TouchableWithoutFeedback onPress={onOk}>{okText}</TouchableWithoutFeedback>
        }
        {
          !hideCancel &&
          (
            typeof (cancelText) === 'string' ?
              <Button type='clear'
                titleStyle={[styles.fontBase]}
                buttonStyle={[styles.buttonStyle]}
                onPress={onCancel} title={cancelText} /> :
              <TouchableWithoutFeedback onPress={onCancel}>{cancelText}</TouchableWithoutFeedback>)
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    marginBottom: 20,
  },
  titleStyle: {
    fontSize: 20,
    lineHeight: 24,
    textAlign: 'center'
  },
  fontBase: {
    fontSize: 14,
    lineHeight: 18
  },
  buttonContainerStyle: {
    marginTop: 30,
  },
  buttonStyle: {
    marginTop: 5,
    marginBottom: 5
  },
  okButtonBackground: {
    borderRadius: 8,
    backgroundColor: 'blue',
  }
})
