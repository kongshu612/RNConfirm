# React Native Confirm

## Features
- programatic create components and refresh components
- support for Confirm out of box.
- multiple portalhost support.

## Usage
- install package
```
npm install react-native-confirm --save
```
- Add the PortalProvider in the Entry Component, e.g App.
```tsx
// assume we are in render function of App, Wrapper children under PortalProvider
<PortalProvider>
xxx
</PortalProvider>

```
- Add the PortalHost if needed, elements will be ported under the host. By default, we will create a root Portalhost in the PortalProvider. so you can skip this step, if single portalHost can match your requirement.
```tsx
<PortalHost name='xxxuniquename'></PortalHost>

```
- call API to create confirm dialog before your process
```tsx
const confirm = useConfirm();
confirm({
      message: 'Are you sure to do something?',
      ok: (closeMe)=>{dosomething();closeMe();},
      cancel: (closeMe) => closeMe(),
    });
```

## Architechter Graphics
![Architechter_Graphic](RNPortal.png?raw=true "Architechter_Graphic")










