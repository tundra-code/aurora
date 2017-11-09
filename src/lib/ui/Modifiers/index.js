/**
 * Adds a shadow to a box shadow any styled component
 * @param {styled-component} Component 
 */
const withShadow = Component => {
  if (!Component.extend) {
    throw new Error(
      "ui Modifier functions can only be applied to styled components at the moment, sorry!"
    );
  }

  return Component.extend`
    box-shadow: rgba(0, 0, 0, 0.1) 0px 5px 15px -5px;
  `;
};

export { withShadow };
