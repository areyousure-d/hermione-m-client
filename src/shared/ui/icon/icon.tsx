import { SVGProps } from "react";

import { SpritesMap } from "./sprite.h";

type Props<Group extends keyof SpritesMap> = {
  name: SpritesMap[Group];
  type?: Group;
} & SVGProps<SVGSVGElement>;

export const Icon = <Group extends keyof SpritesMap = "common">({
  name,
  type,
  ...svgProps
}: Props<Group>) => {
  return (
    <svg {...svgProps}>
      <use xlinkHref={`/public/${type}.svg#${name}`} />
    </svg>
  );
};
