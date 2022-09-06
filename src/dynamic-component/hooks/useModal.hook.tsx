import React, { ReactElement, ReactNode } from 'react';
import { PortalDispatchContext } from '../model/portalContext';
import { ConfirmProps, CustomComponentOptions, DynamicComponentProps, Root_PortalHost } from '../model/model';
import { ModalWrapperComponent } from '../components/modal.wrapper.componnet';
import { ConfirmDialog } from '../components/confirm-dialog.component';

let globaluuid = 0;
function getuuid() {
  return `uuid:${globaluuid++}`;
}

export function useModal(portalHost: string = Root_PortalHost) {
  const dispatch = React.useContext(PortalDispatchContext);
  const open = React.useCallback((item: ReactElement) => {
    if (dispatch == null) {
      throw new Error(`Please add <PortalProvider>xxx</PortalProvider> in the entry component, e.g. App`);
    }
    const uuid = getuuid();
    const close = () => dispatch({ action: 'Remove', item: { uuid: uuid!, item }, portalHost });
    const update = (param: any) => {
      item = React.cloneElement(item, param);
      dispatch({ action: 'Update', item: { uuid, item }, portalHost });
    }
    dispatch({ action: 'Upsert', item: { uuid, item }, portalHost });
    return { close, update };
  }, [dispatch, portalHost]);

  return open;
}

export function useConfirm(portalHost?: string) {
  if (!portalHost) {
    portalHost = Root_PortalHost;
  }
  const open = useModal(portalHost);
  const confirm = React.useCallback((param: ConfirmProps) => {
    let close: Function | null = null;
    const closeMe = () => {
      close?.();
    }
    const { Dialog = ConfirmDialog, dimissOnBackdropClick, ...rest } = param;
    let dynamicParam: DynamicComponentProps = {
      Component: Dialog,
      props: { ...rest },
      dimissOnBackdropClick: dimissOnBackdropClick,
      closeMe,
    }
    let openRef = open(<ModalWrapperComponent {...dynamicParam} />);
    const update = (param: ConfirmProps) => {
      openRef.update({
        Component: ConfirmDialog,
        props: { ...param },
        dimissOnBackdropClick: param.dimissOnBackdropClick,
        closeMe,
      });
    }
    close = openRef.close;
    return { close, update };
  }, [open]);

  return confirm;
}

export function useComponent(portalHost?: string) {
  if (!portalHost) {
    portalHost = Root_PortalHost;
  }
  const open = useModal(portalHost);
  const OpenComponent = React.useCallback((chidren: ReactNode, options?: CustomComponentOptions) => {
    let close: Function | null = null;
    const closeMe = () => {
      close?.();
    }
    let dynamicParam: DynamicComponentProps = {
      closeMe,
      ...(options || {})
    }
    let openRef = open(<ModalWrapperComponent {...dynamicParam}>{chidren}</ModalWrapperComponent>);
    const update = (children: ReactNode, options?: CustomComponentOptions) => {
      openRef.update({
        ...(options || {}),
        children,
        closeMe,
      });
    }
    close = openRef.close;
    return { close, update };
  }, [open]);
  return OpenComponent;
}
