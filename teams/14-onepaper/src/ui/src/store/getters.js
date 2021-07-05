const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  name: state => state.user.name,
  polkadot: state => state.polkadot,
  apiState: state => state.polkadot.apiState,
  events: state => state.events.events,
  pair: state => state.user.pair
}
export default getters
