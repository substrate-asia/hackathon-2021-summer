package controllers

import (
	"encoding/json"
	"fmt"
	"secc_api/models"
	"secc_api/service"

	beego "github.com/beego/beego/v2/server/web"
)

// WristbandController Operations about wristband
type WristbandController struct {
	beego.Controller
}

// Post @Title Create
// @Description create wristband
// @Param	body		body 	models.Wristband true		"The wristband content"
// @Success 200
// @Failure 403 body is empty
// @router / [post]
func (o *WristbandController) Post() {
	paramData := o.Ctx.Input.RequestBody
	var w models.Wristband
	err1 := json.Unmarshal(paramData, &w)
	if err1 != nil {
		fmt.Println("json.Unmarshal is err1:", err1.Error())
	} else {
		service.AddWristband(w)
	}
	wd := models.ConvertWristbandInfo(w)
	service.SaveWristbandInfo(wd)
}

// Get @Title Get
// @Description find wristband by deviceNo
// @Param	deviceNo		path 	string	true		"the deviceNo you want to get"
// @Success 200 {wristband} models.Object
// @Failure 403 :deviceNo is empty
// @router /:deviceNo [get]
func (o *WristbandController) Get() {
	deviceNo := o.Ctx.Input.Param(":deviceNo")
	info := service.QueryWristband(deviceNo)
	o.Data["json"] = info
	_ = o.ServeJSON()
}
