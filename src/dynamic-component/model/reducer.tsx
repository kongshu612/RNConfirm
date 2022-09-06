import type { DispatchActionParam, PortalRepo, PortalType } from "./model";

function addOrUpdate(nodes: PortalType[], node: PortalType): PortalType[] {
  const { uuid } = node;
  const index = nodes.findIndex(it => it.uuid === uuid);
  if (index === -1) {
    nodes.push({ ...node });
  } else {
    nodes[index] = { ...node };
  }
  return nodes;
}

function update(nodes: PortalType[], node: PortalType): PortalType[] {
  const { uuid } = node;
  const index = nodes.findIndex(it => it.uuid === uuid);
  if (index >= 0) {
    nodes[index] = { ...node };
  }
  return nodes;
}

function removeNode(nodes: PortalType[], node: PortalType): PortalType[] {
  const { uuid } = node;
  const index = nodes.findIndex(it => it.uuid === uuid);
  if (index === -1) {
    return nodes;
  } else {
    nodes.splice(index, 1);
    return nodes;
  }
}

function errorForDuplicateHostName(previousState: PortalRepo, name: string) {
  if (name in previousState) {
    throw new Error(`Host name ${name} already exist, please change to another name`);
  }
}

function removeHost(previousState: PortalRepo, name: string) {
  if (name in previousState) {
    let updatedState = { ...previousState };
    delete updatedState[name];
    return updatedState;
  }
  return { ...previousState }
}

export function portalReducre(previousState: PortalRepo, param: DispatchActionParam): PortalRepo {
  const { action, item, portalHost } = param;
  switch (action) {
    case 'RegisterHost': errorForDuplicateHostName(previousState, portalHost); return { ...previousState, ...{ [portalHost]: [] } };
    case 'UnRegisterHost': return removeHost(previousState, portalHost);
  }
  if (!(portalHost in previousState)) {
    throw new Error(`Please create <PortalHost name=${portalHost}></PortalHost> before using Hooking function`);
  }
  const previousElements = previousState[portalHost];
  let updatedElements = previousElements!.slice();
  switch (action) {
    case 'Upsert': updatedElements = addOrUpdate(updatedElements, item!); break;
    case 'Remove': updatedElements = removeNode(updatedElements, item!); break;
    case 'Update': updatedElements = update(updatedElements, item!); break;

  }
  return { ...previousState, ...{ [portalHost]: updatedElements } };
}