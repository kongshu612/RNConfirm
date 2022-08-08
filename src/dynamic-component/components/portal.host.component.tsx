import React from 'react';
import { usePortal } from '../hooks/usePortal.hook';
import { PortalDispatchContext, } from '../model';

const PortalHost: React.FC<{ name: string }> = ({ name }) => {
  const nodes = usePortal(name);
  const dispatch = React.useContext(PortalDispatchContext);
  const elements = React.useMemo(() => (
    <>
      {nodes.map(it => React.cloneElement(<>{it.item}</>, { key: it.uuid }))}
    </>
  ), [nodes]);
  React.useEffect(() => {
    if (!dispatch) {
      throw new Error(`Please add <PortalProvider>xxx</PortalProvider> in the entry component, e.g. App`);
    }
    dispatch({
      portalHost: name,
      action: 'RegisterHost',
    });

    return () => dispatch({ portalHost: name, action: 'UnRegisterHost' });

  }, [dispatch, name]);
  return elements;
}
export default React.memo(PortalHost);