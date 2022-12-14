import React from 'react';
import type { DynamicComponentProps } from '../model/model';
import Dialog from './dialog.component';


export const ModalWrapperComponent: React.FC<DynamicComponentProps> = (params) => {
  const { Component,
    props = {},
    dimissOnBackdropClick = true,
    closeMe,
    children,
    ...rest
  } = params;
  const onBackdropClick = React.useCallback(() => {
    if (dimissOnBackdropClick) {
      closeMe();
    }
  }, [dimissOnBackdropClick, closeMe]);
  return (
    <Dialog visible={true} onDropbackPress={onBackdropClick} {...rest}>
      {Component && <Component {...props} closeMe={closeMe} />}
      {children}
    </Dialog>
  );
};
