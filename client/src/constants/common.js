/**
 * Example:
 * Font layout
 * font-family: "Open Sans";
 * font-style: normal;
 * font-weight: normal;
 * font-size: 16px;
 * line-height: 22px;
 * color: ${ Colors.neutral.grey };
 */

export const fontLayout = ( fontFamily, fontStyle, fontWeight, fontSize, lineHeight, color ) => {
  return `
    font-family: ${ fontFamily };
    font-style: ${ fontStyle };
    font-weight: ${ fontWeight };
    font-size: ${ fontSize };
    line-height: ${ lineHeight };
    color: ${ color };
  `;
}