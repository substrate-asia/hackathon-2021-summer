import { ApiRx, WsProvider } from '@polkadot/api';
import React, { Context, useCallback, useState } from 'react';
import { zip } from 'rxjs';
import * as _ from 'lodash';

interface Endpoint {
  domain: string;
  ready: boolean;
  connected: boolean;
  enabled: boolean;
  api: ApiRx;
  errorHandler: (...args: any[]) => any;
  readyHandler: (...args: any[]) => any;
  connectedHandler: (...args: any[]) => any;
  disconnectedHandler: (...args: any[]) => any;
}

interface EndpointsContextProps {
  endpoints: Endpoint[];
  add: (domain: string) => void;
  remove: (domain: number) => void;
  toggleChecked: (index: number) => void;
}

export const EndpointsContext: Context<EndpointsContextProps> = React.createContext({} as unknown as EndpointsContextProps);

function updateEndpointFactory(which: string | number, update: (endpoint: Endpoint) => Endpoint | undefined) {
  return (endpoints: Endpoint[]) => {
    let index: number;

    if (typeof which === 'number') {
      index = which;
    } else {
      index = endpoints.findIndex(endpoint => endpoint.domain === which);
    }
  
    if (index < 0) {
      return endpoints;
    }
  
    const updated = update(endpoints[index]);

    if (_.isEqual(updated, endpoints[index])) {
      return endpoints;
    }

    return updated ?
      [
        ...endpoints.slice(0, index),
        updated,
        ...endpoints.slice(index + 1),
      ]
      :
      [
        ...endpoints.slice(0, index),
        ...endpoints.slice(index + 1),
      ];
  };
}

export const EndpointsProvider = React.memo(
  ({ children }: { children: React.ReactNode }): React.ReactElement => {
    const [ endpoints, setEndpoints ] = useState<Endpoint[]>([]);

    const add = useCallback((domain: string) => {
      if (endpoints.find(e => e.domain === domain)) {
        return;
      }

      const wsProvider = new WsProvider(domain);
      const api = new ApiRx({ provider: wsProvider });

      const endpoint: Endpoint = {
        ready: false,
        connected: false,
        enabled: false,
        domain,
        api,
        readyHandler: async (_api: ApiRx) => {
          console.log(`endpoint ${domain} ready`);
    
          const [ {
            ss58Format,
            tokenDecimals,
            tokenSymbol,
          },
            _systemName,
            metadata,
          ] = await zip(
            _api.rpc.system.properties(),
            _api.rpc.system.name(),
            _api.rpc.state.getMetadata(),
          ).toPromise();
    
          setEndpoints(
            updateEndpointFactory(domain, endpoint => ({
              ...endpoint,
              api,
              ready: true,
            }))
          );
        },
        connectedHandler() {
          console.log(`endpoint ${domain} connected`);
  
          setEndpoints(
            updateEndpointFactory(domain, endpoint => ({
              ...endpoint,
              connected: true,
            }))
          );
        },
        errorHandler(error) {
          console.log(`endpoint ${domain} error`, error);
          
          // setEndpoints(
          //   updateEndpointFactory(domain, endpoint => ({
          //     ...endpoint,
          //     connected: false,
          //   }))
          // );
        },
        disconnectedHandler() {
          console.log(`endpoint ${domain} disconnected`);
  
          setEndpoints(
            updateEndpointFactory(domain, endpoint => ({
              ...endpoint,
              connected: false,
            }))
          );
        }
      };

      api.on('ready', endpoint.readyHandler);
      api.on('error', endpoint.errorHandler);
      api.on('connected', endpoint.connectedHandler);
      api.on('disconnected', endpoint.disconnectedHandler);

      setEndpoints([...endpoints, endpoint]);
    }, [endpoints]);

    const remove = useCallback((index: number) => {
      const endpoint = endpoints[index];
      
      console.log('remove, api', endpoint.api, 'handler', endpoint?.disconnectedHandler, 'domain', index, 'endpoints', endpoints)
      if (!endpoint) {
        return;
      }

      try {
        endpoint.api.disconnect().catch(() => {});
      } catch (e) {}

      endpoint.api.off('ready', endpoint.readyHandler);
      endpoint.api.off('error', endpoint.errorHandler);
      endpoint.api.off('connected', endpoint.connectedHandler);
      endpoint.api.off('disconnected', endpoint.disconnectedHandler);

      setEndpoints(
        updateEndpointFactory(index, () => undefined)
      );
    }, [endpoints]);
  
    const toggleChecked = useCallback((index: number) =>
      setEndpoints(
        updateEndpointFactory(index, endpoint => ({
          ...endpoint,
          enabled: !endpoint.enabled,
        }))
      ),
      []
    );

    return <EndpointsContext.Provider value={{
      endpoints,
      add,
      remove,
      toggleChecked,
    }}>{children}</EndpointsContext.Provider>;
  }
);
