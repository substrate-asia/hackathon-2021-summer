package tools

import (
	beego "github.com/beego/beego/v2/server/web"
	_ "github.com/go-sql-driver/mysql"
	"github.com/go-xorm/xorm"
	"secc_api/models"
	"xorm.io/core"
)

func GetSQLUrl() string {
	host, _ := beego.AppConfig.String("db.host")
	port, _ := beego.AppConfig.String("db.port")
	user, _ := beego.AppConfig.String("db.user")
	password, _ := beego.AppConfig.String("db.password")
	name, _ := beego.AppConfig.String("db.name")
	if port == "" {
		port = "3306"
	}
	dsn := user + ":" + password + "@tcp(" + host + ":" + port + ")/" + name + "?charset=utf8"
	return dsn
}
func QueryEngine() *xorm.Engine {
	var err error
	var engine *xorm.Engine
	tablePrefix, _ := beego.AppConfig.String("table.prefix")
	mapper := core.NewPrefixMapper(core.SnakeMapper{}, tablePrefix)
	engine, err = xorm.NewEngine("mysql", GetSQLUrl())
	if err != nil {
		panic("get database connection fail")
	}
	//日志是一个接口，通过设置日志，可以显示SQL，警告以及错误等，默认的显示级别为INFO
	_ = engine.Sync2(new(models.Wristband), new(models.Medical), new(models.SleepReport), new(models.SleepSign))
	engine.ShowSQL(true)
	engine.SetTableMapper(mapper)
	engine.Logger().SetLevel(core.LOG_DEBUG)
	return engine
}
