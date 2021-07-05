type Theme = "light" | "dark";

type UiStore = {
  theme: Theme;
};

export function initialize(): UiStore {
  return {
    theme: "dark",
  };
}

export type t = UiStore;
