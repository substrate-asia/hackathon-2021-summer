import queryString from "query-string";

type Id = string;

function switchPath(x: string) {
  location.hash = `#${x}`;
}

function qsStringify(queries: { [k: string]: any }) {
  return queryString.stringify(queries, { arrayFormat: "bracket" });
}

// generated

// Generated with router-code-generator@0.3.0

export let genRouter = {
  search: {
    name: "search",
    raw: "search",
    path: (queries?: IGenQuerySearch) => `/search?${qsStringify(queries)}`,
    go: (queries?: IGenQuerySearch) => switchPath(`/search?${qsStringify(queries)}`),
  },
  portal: {
    name: "portal",
    raw: "portal",
    path: (queries?: {}) => `/portal`,
    go: (queries?: {}) => switchPath(`/portal`),
  },
  pickName_: {
    name: "pick-name",
    raw: "pick-name/:name",
    path: (name: string) => `/pick-name/${name}`,
    go: (name: string) => switchPath(`/pick-name/${name}`),
    register: {
      name: "register",
      raw: "register",
      path: (name: string) => `/pick-name/${name}/register`,
      go: (name: string) => switchPath(`/pick-name/${name}/register`),
      processing: {
        name: "processing",
        raw: "processing",
        path: (name: string) => `/pick-name/${name}/register/processing`,
        go: (name: string) => switchPath(`/pick-name/${name}/register/processing`),
      },
    },
    details: {
      name: "details",
      raw: "details",
      path: (name: string) => `/pick-name/${name}/details`,
      go: (name: string) => switchPath(`/pick-name/${name}/details`),
    },
    subdomains: {
      name: "subdomains",
      raw: "subdomains",
      path: (name: string) => `/pick-name/${name}/subdomains`,
      go: (name: string) => switchPath(`/pick-name/${name}/subdomains`),
    },
  },
  browseName_: {
    name: "browse-name",
    raw: "browse-name/:name",
    path: (name: string) => `/browse-name/${name}`,
    go: (name: string) => switchPath(`/browse-name/${name}`),
    registrants: {
      name: "registrants",
      raw: "registrants",
      path: (name: string) => `/browse-name/${name}/registrants`,
      go: (name: string) => switchPath(`/browse-name/${name}/registrants`),
    },
    controls: {
      name: "controls",
      raw: "controls",
      path: (name: string) => `/browse-name/${name}/controls`,
      go: (name: string) => switchPath(`/browse-name/${name}/controls`),
    },
  },
  myNames: {
    name: "my-names",
    raw: "my-names",
    path: () => `/my-names`,
    go: () => switchPath(`/my-names`),
    registrants: {
      name: "registrants",
      raw: "registrants",
      path: () => `/my-names/registrants`,
      go: () => switchPath(`/my-names/registrants`),
    },
    controllers: {
      name: "controllers",
      raw: "controllers",
      path: () => `/my-names/controllers`,
      go: () => switchPath(`/my-names/controllers`),
    },
    favourites: {
      name: "favourites",
      raw: "favourites",
      path: () => `/my-names/favourites`,
      go: () => switchPath(`/my-names/favourites`),
    },
  },
  manage_: {
    name: "manage",
    raw: "manage/:name",
    path: (name: string) => `/manage/${name}`,
    go: (name: string) => switchPath(`/manage/${name}`),
    details: {
      name: "details",
      raw: "details",
      path: (name: string) => `/manage/${name}/details`,
      go: (name: string) => switchPath(`/manage/${name}/details`),
      edit: {
        name: "edit",
        raw: "edit",
        path: (name: string) => `/manage/${name}/details/edit`,
        go: (name: string) => switchPath(`/manage/${name}/details/edit`),
      },
    },
    subdomains: {
      name: "subdomains",
      raw: "subdomains",
      path: (name: string) => `/manage/${name}/subdomains`,
      go: (name: string) => switchPath(`/manage/${name}/subdomains`),
    },
  },
  jump_: {
    name: "jump",
    raw: "jump/:name",
    path: (name: string) => `/jump/${name}`,
    go: (name: string) => switchPath(`/jump/${name}`),
  },
  $: {
    name: "home",
    raw: "",
    path: () => `/`,
    go: () => switchPath(`/`),
  },
};

export interface IGenQuerySearch {
  keyword?: string;
}

export interface GenRouterTypeTree {
  next:
    | GenRouterTypeTree["search"]
    | GenRouterTypeTree["portal"]
    | GenRouterTypeTree["pickName_"]
    | GenRouterTypeTree["browseName_"]
    | GenRouterTypeTree["myNames"]
    | GenRouterTypeTree["manage_"]
    | GenRouterTypeTree["jump_"]
    | GenRouterTypeTree["$"];
  search: {
    name: "search";
    params: {};
    query: { keyword?: string };
    next: null;
  };
  portal: {
    name: "portal";
    params: {};
    query: {};
    next: null;
  };
  pickName_: {
    name: "pick-name";
    params: { name: string };
    query: {};
    next: GenRouterTypeTree["pickName_"]["register"] | GenRouterTypeTree["pickName_"]["details"] | GenRouterTypeTree["pickName_"]["subdomains"];
    register: {
      name: "register";
      params: { name: string };
      query: {};
      next: GenRouterTypeTree["pickName_"]["register"]["processing"];
      processing: {
        name: "processing";
        params: { name: string };
        query: {};
        next: null;
      };
    };
    details: {
      name: "details";
      params: { name: string };
      query: {};
      next: null;
    };
    subdomains: {
      name: "subdomains";
      params: { name: string };
      query: {};
      next: null;
    };
  };
  browseName_: {
    name: "browse-name";
    params: { name: string };
    query: {};
    next: GenRouterTypeTree["browseName_"]["registrants"] | GenRouterTypeTree["browseName_"]["controls"];
    registrants: {
      name: "registrants";
      params: { name: string };
      query: {};
      next: null;
    };
    controls: {
      name: "controls";
      params: { name: string };
      query: {};
      next: null;
    };
  };
  myNames: {
    name: "my-names";
    params: {};
    query: {};
    next: GenRouterTypeTree["myNames"]["registrants"] | GenRouterTypeTree["myNames"]["controllers"] | GenRouterTypeTree["myNames"]["favourites"];
    registrants: {
      name: "registrants";
      params: {};
      query: {};
      next: null;
    };
    controllers: {
      name: "controllers";
      params: {};
      query: {};
      next: null;
    };
    favourites: {
      name: "favourites";
      params: {};
      query: {};
      next: null;
    };
  };
  manage_: {
    name: "manage";
    params: { name: string };
    query: {};
    next: GenRouterTypeTree["manage_"]["details"] | GenRouterTypeTree["manage_"]["subdomains"];
    details: {
      name: "details";
      params: { name: string };
      query: {};
      next: GenRouterTypeTree["manage_"]["details"]["edit"];
      edit: {
        name: "edit";
        params: { name: string };
        query: {};
        next: null;
      };
    };
    subdomains: {
      name: "subdomains";
      params: { name: string };
      query: {};
      next: null;
    };
  };
  jump_: {
    name: "jump";
    params: { name: string };
    query: {};
    next: null;
  };
  $: {
    name: "home";
    params: {};
    query: {};
    next: null;
  };
}
