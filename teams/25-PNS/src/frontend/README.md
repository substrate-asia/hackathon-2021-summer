## Web

### Develop

Dev:

```bash
yarn
yarn vite
```

Build:

```bash
yarn build
```

### SDK 加载

开发环境, 通过软连接到 `sdk/` 路口.

Actions, 通过配置加载到 `sdk/` 路径, 其中用到了一个 GitHub Access Token.

### Router hierarchy

```
New names(Search)
  (View name)
    Name register
      (Processing)
    Details
    Subdomains
  (View others account)
    Registrants
    Controls

All my names
  Registrants
  Controls
  (view my name)
    Details
      (Edit form)
    Subdomains
  Favourites

Favourites(redirect)
```

Paths

```
/search?keyword=_
/pick-name/:name/register
/pick-name/:name/register/processing
/pick-name/:name/detail
/pick-name/:name/subdomains
/browse-name/:name/registrants
/browse-name/:name/controls

/my-names -> redirect /my-names/registrants
/my-names/registrants
/my-names/controllers
/my-names/favourites

/favourites -> redirect ./my-names/favourites
/ -> redirect ./new-names

/manage/:name/ -> redirect ./details
/manage/:name/details
/manage/:name/details/edit
/manage/:name/subdomains
```

### Resource

- App Dev https://app.pns.link/portal/
- Portal Dev https://app.pns.link/portal/
- [Figma](https://www.figma.com/file/Ghc5wio7QParG5lzwwIj0d/Polkadot-Name-System?node-id=86%3A3823)
