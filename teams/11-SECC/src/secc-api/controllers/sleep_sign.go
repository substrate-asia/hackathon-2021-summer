package controllers

import (
	"encoding/json"
	"fmt"
	"secc_api/models"
	"secc_api/service"

	beego "github.com/beego/beego/v2/server/web"
)

// SleepSignController Operations about sleep_sign
type SleepSignController struct {
	beego.Controller
}

// Post @Title Create
// @Description create sleep_sign
// @Param	body		body 	models.SleepSign true		"The sleep_sign content"
// @Success 200
// @Failure 403 body is empty
// @router / [post]
func (o *SleepSignController) Post() {
	paramData := o.Ctx.Input.RequestBody
	var ss models.SleepSign
	err1 := json.Unmarshal(paramData, &ss)
	if err1 != nil {
		fmt.Println("json.Unmarshal is err1:", err1.Error())
	} else {
		service.AddSleepSign(ss)
	}
	ssd := models.ConvertSleepSignInfo(ss)
	service.SaveSleepSignInfo(ssd)
}

// Get @Title Get
// @Description find sleep_sign by deviceNo
// @Param	deviceNo		path 	string	true		"the deviceNo you want to get"
// @Success 200 {sleep_sign} models.Object
// @Failure 403 :deviceNo is empty
// @router /:deviceNo [get]
func (o *SleepSignController) Get() {
	deviceNo := o.Ctx.Input.Param(":deviceNo")
	info := service.QuerySleepSign(deviceNo)
	o.Data["json"] = info
	_ = o.ServeJSON()
}
