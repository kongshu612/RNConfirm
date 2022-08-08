import type React from "react";
import type { ReactElement } from "react";

export interface PortalType {
  uuid: string;
  item: React.ReactNode;
}

export const Actions = ['Upsert', 'Remove', 'RegisterHost', 'UnRegisterHost'] as const;
export type ActionTypes = typeof Actions[number];

export interface DispatchActionParam {
  action: ActionTypes,
  item?: PortalType,
  portalHost: string;
}

export type PortalRepo = Record<string, PortalType[]>;

export const Initial_State = {};

export interface ConfirmProps {
  title?: ReactElement | string;
  message?: ReactElement | string;
  okText?: ReactElement | string;
  cancelText?: ReactElement | string;
  ok?: (closeMe: () => void) => void,
  cancel?: (closeMe: () => void) => void,
  dimissOnBackdropClick?: boolean;
  hideCancel?: boolean;
  Dialog?: (typeof React.Component<any>) | (React.FC<any>);
}

export interface DynamicComponentProps {
  Component: (typeof React.Component<any>) | (React.FC<any>);
  props: any;
  dimissOnBackdropClick?: boolean;
  closeMe: () => void;
}

export const Root_PortalHost = '##RootPortalHost##';