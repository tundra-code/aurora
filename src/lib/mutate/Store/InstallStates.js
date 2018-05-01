export const INSTALLING = "INSTALLING";
export const INSTALLED = "INSTALLED";
export const UNINSTALL = "UNINSTALL";
export const UNINSTALLED = "UNINSTALLED";
export const ERROR = "ERROR";
export const DEFAULT = "DEFAULT";

const stateOrders = [DEFAULT, INSTALLING, INSTALLED, UNINSTALL, UNINSTALLED];

export const nextState = prevState => {
  if (!prevState) {
    prevState = DEFAULT;
  }

  if (prevState === ERROR) {
    return DEFAULT;
  }

  const index = stateOrders.indexOf(prevState);
  const nextIndex = (index + 1) % stateOrders.length;
  return stateOrders[nextIndex];
};
