import { SVGProps } from "react";

import { SpritesMap } from "./sprite.h";

type Props = {
  name: SpritesMap[keyof SpritesMap];
  type?: keyof SpritesMap;
} & SVGProps<SVGSVGElement>;

export const Icon = ({ name, type = "common", ...svgProps }: Props) => {
  return (
    <svg {...svgProps}>
      <use xlinkHref={`/${type}.svg#${name}`} />
    </svg>
  );
};
