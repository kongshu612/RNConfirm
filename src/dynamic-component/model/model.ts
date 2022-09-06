import type React from "react";
import type { ReactElement, ReactNode } from "react";
import type { StyleProp, ViewStyle } from "react-native";

export interface PortalType {
  uuid: string;
  item: React.ReactNode;
}

export const Actions = ['Upsert', 'Remove', 'Update', 'RegisterHost', 'UnRegisterHost'] as const;
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

const alignPoints = ['left', 'center', 'right'] as const;
export type AlignPointType = typeof alignPoints[number];

export interface IModalProps {
  visible: boolean;
  onDropbackPress?: () => void;
  children?: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  overlayStyle?: StyleProp<ViewStyle>;
  drawBackStyle?: StyleProp<ViewStyle>;
  position?: 'center' | 'top' | 'bottom' | 'auto';
  relativeToElementRef?: React.MutableRefObject<React.ReactNode>;
  relativePoint?: { x: number, y: number };
  alignPoint?: AlignPointType;
}

export interface DynamicComponentProps {
  Component?: (typeof React.Component<any>) | (React.FC<any>);
  props?: any;
  dimissOnBackdropClick?: boolean;
  closeMe: () => void;
  children?: ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  overlayStyle?: StyleProp<ViewStyle>;
  drawBackStyle?: StyleProp<ViewStyle>;
  position?: 'center' | 'top' | 'bottom' | 'auto';
  relativeToElementRef?: React.MutableRefObject<React.ReactNode>;
  relativePoint?: { x: number, y: number };
  alignPoint?: AlignPointType;
}

export type CustomComponentOptions = Pick<DynamicComponentProps, 'dimissOnBackdropClick' | 'containerStyle' | 'overlayStyle' | 'drawBackStyle' | 'position' | 'relativeToElementRef' | 'relativePoint' | 'alignPoint'>;

export const Root_PortalHost = '##RootPortalHost##';