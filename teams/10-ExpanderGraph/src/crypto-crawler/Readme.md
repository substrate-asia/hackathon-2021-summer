# crypto crawler
Obtain and parse the data on the Ethereum chain and write it into the database. Use the node service provided by Infura.

# user's guidance
## Compile code
```make```
## initialize
```./crypto-crawler init```
## Modify the configuration file
Default directory of configuration files ~/.crawler/crawler.toml
```
[dbinfo]
  ip = "127.0.0.1"
  name = "db_name"
  password = "password"
  port = "3306"
  type = "mysql"
  user = "user"

[infura]
  token = "https://mainnet.infura.io/v3/xxx"
```
## run
```./crypto-crawler init```
