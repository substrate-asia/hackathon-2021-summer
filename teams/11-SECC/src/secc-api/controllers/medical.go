package controllers

import (
	"bytes"
	"io"
	"log"
	"secc_api/models"
	"secc_api/service"
	"secc_api/tools"

	beego "github.com/beego/beego/v2/server/web"
)

// MedicalController Operations about medical
type MedicalController struct {
	beego.Controller
}

// Get @Title Get
// @Description find medical by idCard
// @Param	idCard		path 	string	true		"the idCard you want to get"
// @Success 200 {medical} models.Medical
// @Failure 403 :idCard is empty
// @router /:idCard [get]
func (o *MedicalController) Get() {
	deviceNo := o.Ctx.Input.Param(":idCard")
	info := service.QueryMedical(deviceNo)
	o.Data["json"] = info
	_ = o.ServeJSON()
}

// UploadFile @Title UploadFile
// @Description UploadFile
// @Param	body		body 	multipart.File true		"The UploadFile content"
// @Success 200 {medical} models.Medical
// @Failure 403 body is empty
// @router /UploadFile [post]
func (o *MedicalController) UploadFile() {
	f, _, err := o.GetFile("uploadName")
	idCard := o.GetString("idCard")
	if err != nil {
		log.Fatal("getfile err ", err)
	}
	defer f.Close()
	buf := bytes.NewBuffer(nil)
	_, err = io.Copy(buf, f)
	var hash string
	hash, _, _ = tools.UploadToIpfs(buf.Bytes())
	m := models.Medical{IdCard: idCard, FileHash: hash, DataId: tools.Int64String(int64(tools.GetSonyFlakeID()))}
	service.AddMedical(m)
	md := models.ConvertMedicalInfo(m)
	service.SaveMedicalInfo(md)
	o.Data["json"] = m
	_ = o.ServeJSON()
}
