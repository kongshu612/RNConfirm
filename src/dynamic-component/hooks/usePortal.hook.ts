import React from 'react';
import { PortalStateContext } from '../model';

export function usePortal(name: string) {
  const state = React.useContext(PortalStateContext);
  console.log(`current state is`);
  console.log(state);
  return React.useMemo(() => state[name] || [], [state]);
}