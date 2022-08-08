import React from 'react';
import { Initial_State, Root_PortalHost } from '../model/model';
import { PortalDispatchContext, PortalStateContext } from '../model/portalContext';
import { portalReducre } from '../model/reducer';
import PortalHost from './portal.host.component';

const InnerPortalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = React.useReducer(portalReducre, Initial_State);
  return (
    <PortalDispatchContext.Provider value={dispatch}>
      <PortalStateContext.Provider value={state}>
        {children}
        <PortalHost name={Root_PortalHost} />
      </PortalStateContext.Provider>
    </PortalDispatchContext.Provider>
  )
}
const PortalProvider = React.memo(InnerPortalProvider);
PortalProvider.displayName = 'Portal Provider';
export { PortalProvider };