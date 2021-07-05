package controllers

import (
	"encoding/json"
	"fmt"
	"secc_api/models"
	"secc_api/service"

	beego "github.com/beego/beego/v2/server/web"
)

// SleepReportController Operations about sleep_report
type SleepReportController struct {
	beego.Controller
}

// Post @Title Create
// @Description create sleep_report
// @Param	body		body 	models.SleepReport true		"The sleep_report content"
// @Success 200
// @Failure 403 body is empty
// @router / [post]
func (o *SleepReportController) Post() {
	paramData := o.Ctx.Input.RequestBody
	var sr models.SleepReport
	err1 := json.Unmarshal(paramData, &sr)
	if err1 != nil {
		fmt.Println("json.Unmarshal is err1:", err1.Error())
	} else {
		service.AddSleepReport(sr)
	}
	srd := models.ConvertSleepReportInfo(sr)
	service.SaveSleepReportInfo(srd)
}

// Get @Title Get
// @Description find sleep_report by deviceNo
// @Param	deviceNo		path 	string	true		"the deviceNo you want to get"
// @Success 200 {sleep_report} models.Object
// @Failure 403 :deviceNo is empty
// @router /:deviceNo [get]
func (o *SleepReportController) Get() {
	deviceNo := o.Ctx.Input.Param(":deviceNo")
	info := service.QuerySleepReport(deviceNo)
	o.Data["json"] = info
	_ = o.ServeJSON()
}
