import { IRouteRule } from "@worktools/ruled-router";

export const routerRules: IRouteRule[] = [
  {
    path: "search",
    name: "search",
    queries: ["keyword"],
  },
  {
    path: "portal",
    name: "portal",
    queries: [],
  },
  {
    path: "pick-name/:name",
    name: "pick-name",
    next: [
      {
        path: "register",
        name: "register",
        next: [
          {
            path: "processing",
            name: "processing",
          },
        ],
      },
      {
        path: "details",
        name: "details",
      },
      {
        path: "subdomains",
        name: "subdomains",
      },
    ],
  },
  {
    path: "browse-name/:name",
    name: "browse-name",
    next: [{ path: "registrants" }, { path: "controls" }],
  },
  {
    path: "my-names",
    name: "my-names",
    next: [
      {
        path: "registrants",
        name: "registrants",
      },
      {
        path: "controllers",
        name: "controllers",
      },
      {
        path: "favourites",
        name: "favourites",
      },
    ],
  },
  {
    name: "manage",
    path: "manage/:name",
    next: [
      {
        path: "details",
        name: "details",
        next: [
          {
            path: "edit",
            name: "edit",
          },
        ],
      },
      {
        path: "subdomains",
        name: "subdomains",
      },
    ],
  },
  { name: "jump", path: "jump/:name" },
  { path: "", name: "home" },
];
