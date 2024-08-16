declare module "svelte-fa" {
  import { SvelteComponentTyped } from "svelte";
  import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

  interface FaProps {
    icon: IconDefinition;
    size?: string | number;
    color?: string;
    spin?: boolean;
    pulse?: boolean;
    flip?: "horizontal" | "vertical" | "both";
    pull?: "left" | "right";
    rotate?: number | string;
    border?: boolean;
    fixedWidth?: boolean;
    inverse?: boolean;
    listItem?: boolean;
    swapOpacity?: boolean;
    class?: string;
  }

  export default class Fa extends SvelteComponentTyped<FaProps> {}
}
