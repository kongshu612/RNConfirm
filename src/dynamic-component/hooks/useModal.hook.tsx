import React, { ReactElement } from 'react';
import { PortalDispatchContext } from '../model/portalContext';
import { ConfirmProps, DynamicComponentProps, Root_PortalHost } from '../model/model';
import { ConfirmDialog, ModalWrapperComponnet } from '../components/modal.wrapper.componnet';

let globaluuid = 0;
function getuuid() {
  return `uuid:${globaluuid++}`;
}

export function useModal(portalHost: string) {
  const dispatch = React.useContext(PortalDispatchContext);
  const open = React.useCallback((item: ReactElement) => {
    if (dispatch == null) {
      throw new Error(`Please add <PortalProvider>xxx</PortalProvider> in the entry component, e.g. App`);
    }
    const uuid = getuuid();
    const close = () => dispatch({ action: 'Remove', item: { uuid: uuid!, item }, portalHost });
    const update = (param: any) => {
      item = React.cloneElement(item, param);
      dispatch({ action: 'Upsert', item: { uuid, item }, portalHost });
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
    let openRefer = open(<ModalWrapperComponnet {...dynamicParam} />);
    const update = (param: ConfirmProps) => {
      openRefer.update({
        Component: ConfirmDialog,
        props: { ...param },
        dimissOnBackdropClick: param.dimissOnBackdropClick,
        closeMe,
      });
    }
    close = openRefer.close;
    return { close, update };
  }, [open]);

  return confirm;
}