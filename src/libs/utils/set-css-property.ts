export const setCSSProperty = (
  element: HTMLElement,
  property: string,
  value: string
) => {
  element?.style.setProperty(property, value);
};
