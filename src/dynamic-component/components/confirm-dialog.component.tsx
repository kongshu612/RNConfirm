import React from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import type { ConfirmProps } from '../model';



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
            <Button onPress={onOk} title={okText} /> :
            <TouchableWithoutFeedback onPress={onOk}>{okText}</TouchableWithoutFeedback>
        }
        {
          !hideCancel &&
          (
            typeof (cancelText) === 'string' ?
              <TouchableOpacity onPress={onCancel} style={[styles.cancelContainerStyle]}>
                <Text style={[styles.cancelButtonStyle]}>{cancelText}</Text>
              </TouchableOpacity> :
              <TouchableWithoutFeedback onPress={onCancel} style={[styles.cancelContainerStyle]}>{cancelText}</TouchableWithoutFeedback>)
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
    borderWidth: 0,
  },
  cancelButtonStyle: {
    textAlign: 'center',
    margin: 5,
    fontWeight: "500",
  },
  cancelContainerStyle: {
    marginTop: 10,
  }
})