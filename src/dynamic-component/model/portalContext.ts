import React from 'react';
import type { DispatchActionParam, PortalRepo, } from './model';

export const PortalDispatchContext = React.createContext<React.Dispatch<DispatchActionParam> | null>(null);
export const PortalStateContext = React.createContext<PortalRepo>({});