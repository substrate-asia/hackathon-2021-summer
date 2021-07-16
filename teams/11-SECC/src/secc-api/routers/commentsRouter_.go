package routers

import (
	beego "github.com/beego/beego/v2/server/web"
	"github.com/beego/beego/v2/server/web/context/param"
)

func init() {

	beego.GlobalControllerRouter["secc_api/controllers:MedicalController"] = append(beego.GlobalControllerRouter["secc_api/controllers:MedicalController"],
		beego.ControllerComments{
			Method:           "Get",
			Router:           "/:idCard",
			AllowHTTPMethods: []string{"get"},
			MethodParams:     param.Make(),
			Filters:          nil,
			Params:           nil})

	beego.GlobalControllerRouter["secc_api/controllers:MedicalController"] = append(beego.GlobalControllerRouter["secc_api/controllers:MedicalController"],
		beego.ControllerComments{
			Method:           "UploadFile",
			Router:           "/UploadFile",
			AllowHTTPMethods: []string{"post"},
			MethodParams:     param.Make(),
			Filters:          nil,
			Params:           nil})

	beego.GlobalControllerRouter["secc_api/controllers:ObjectController"] = append(beego.GlobalControllerRouter["secc_api/controllers:ObjectController"],
		beego.ControllerComments{
			Method:           "Post",
			Router:           "/",
			AllowHTTPMethods: []string{"post"},
			MethodParams:     param.Make(),
			Filters:          nil,
			Params:           nil})

	beego.GlobalControllerRouter["secc_api/controllers:ObjectController"] = append(beego.GlobalControllerRouter["secc_api/controllers:ObjectController"],
		beego.ControllerComments{
			Method:           "GetAll",
			Router:           "/",
			AllowHTTPMethods: []string{"get"},
			MethodParams:     param.Make(),
			Filters:          nil,
			Params:           nil})

	beego.GlobalControllerRouter["secc_api/controllers:ObjectController"] = append(beego.GlobalControllerRouter["secc_api/controllers:ObjectController"],
		beego.ControllerComments{
			Method:           "Get",
			Router:           "/:objectId",
			AllowHTTPMethods: []string{"get"},
			MethodParams:     param.Make(),
			Filters:          nil,
			Params:           nil})

	beego.GlobalControllerRouter["secc_api/controllers:ObjectController"] = append(beego.GlobalControllerRouter["secc_api/controllers:ObjectController"],
		beego.ControllerComments{
			Method:           "Put",
			Router:           "/:objectId",
			AllowHTTPMethods: []string{"put"},
			MethodParams:     param.Make(),
			Filters:          nil,
			Params:           nil})

	beego.GlobalControllerRouter["secc_api/controllers:ObjectController"] = append(beego.GlobalControllerRouter["secc_api/controllers:ObjectController"],
		beego.ControllerComments{
			Method:           "Delete",
			Router:           "/:objectId",
			AllowHTTPMethods: []string{"delete"},
			MethodParams:     param.Make(),
			Filters:          nil,
			Params:           nil})

	beego.GlobalControllerRouter["secc_api/controllers:SleepReportController"] = append(beego.GlobalControllerRouter["secc_api/controllers:SleepReportController"],
		beego.ControllerComments{
			Method:           "Post",
			Router:           "/",
			AllowHTTPMethods: []string{"post"},
			MethodParams:     param.Make(),
			Filters:          nil,
			Params:           nil})

	beego.GlobalControllerRouter["secc_api/controllers:SleepReportController"] = append(beego.GlobalControllerRouter["secc_api/controllers:SleepReportController"],
		beego.ControllerComments{
			Method:           "Get",
			Router:           "/:deviceNo",
			AllowHTTPMethods: []string{"get"},
			MethodParams:     param.Make(),
			Filters:          nil,
			Params:           nil})

	beego.GlobalControllerRouter["secc_api/controllers:SleepSignController"] = append(beego.GlobalControllerRouter["secc_api/controllers:SleepSignController"],
		beego.ControllerComments{
			Method:           "Post",
			Router:           "/",
			AllowHTTPMethods: []string{"post"},
			MethodParams:     param.Make(),
			Filters:          nil,
			Params:           nil})

	beego.GlobalControllerRouter["secc_api/controllers:SleepSignController"] = append(beego.GlobalControllerRouter["secc_api/controllers:SleepSignController"],
		beego.ControllerComments{
			Method:           "Get",
			Router:           "/:deviceNo",
			AllowHTTPMethods: []string{"get"},
			MethodParams:     param.Make(),
			Filters:          nil,
			Params:           nil})

	beego.GlobalControllerRouter["secc_api/controllers:UserController"] = append(beego.GlobalControllerRouter["secc_api/controllers:UserController"],
		beego.ControllerComments{
			Method:           "Post",
			Router:           "/",
			AllowHTTPMethods: []string{"post"},
			MethodParams:     param.Make(),
			Filters:          nil,
			Params:           nil})

	beego.GlobalControllerRouter["secc_api/controllers:UserController"] = append(beego.GlobalControllerRouter["secc_api/controllers:UserController"],
		beego.ControllerComments{
			Method:           "GetAll",
			Router:           "/",
			AllowHTTPMethods: []string{"get"},
			MethodParams:     param.Make(),
			Filters:          nil,
			Params:           nil})

	beego.GlobalControllerRouter["secc_api/controllers:UserController"] = append(beego.GlobalControllerRouter["secc_api/controllers:UserController"],
		beego.ControllerComments{
			Method:           "Get",
			Router:           "/:uid",
			AllowHTTPMethods: []string{"get"},
			MethodParams:     param.Make(),
			Filters:          nil,
			Params:           nil})

	beego.GlobalControllerRouter["secc_api/controllers:UserController"] = append(beego.GlobalControllerRouter["secc_api/controllers:UserController"],
		beego.ControllerComments{
			Method:           "Put",
			Router:           "/:uid",
			AllowHTTPMethods: []string{"put"},
			MethodParams:     param.Make(),
			Filters:          nil,
			Params:           nil})

	beego.GlobalControllerRouter["secc_api/controllers:UserController"] = append(beego.GlobalControllerRouter["secc_api/controllers:UserController"],
		beego.ControllerComments{
			Method:           "Delete",
			Router:           "/:uid",
			AllowHTTPMethods: []string{"delete"},
			MethodParams:     param.Make(),
			Filters:          nil,
			Params:           nil})

	beego.GlobalControllerRouter["secc_api/controllers:UserController"] = append(beego.GlobalControllerRouter["secc_api/controllers:UserController"],
		beego.ControllerComments{
			Method:           "Login",
			Router:           "/login",
			AllowHTTPMethods: []string{"get"},
			MethodParams:     param.Make(),
			Filters:          nil,
			Params:           nil})

	beego.GlobalControllerRouter["secc_api/controllers:UserController"] = append(beego.GlobalControllerRouter["secc_api/controllers:UserController"],
		beego.ControllerComments{
			Method:           "Logout",
			Router:           "/logout",
			AllowHTTPMethods: []string{"get"},
			MethodParams:     param.Make(),
			Filters:          nil,
			Params:           nil})

	beego.GlobalControllerRouter["secc_api/controllers:WristbandController"] = append(beego.GlobalControllerRouter["secc_api/controllers:WristbandController"],
		beego.ControllerComments{
			Method:           "Post",
			Router:           "/",
			AllowHTTPMethods: []string{"post"},
			MethodParams:     param.Make(),
			Filters:          nil,
			Params:           nil})

	beego.GlobalControllerRouter["secc_api/controllers:WristbandController"] = append(beego.GlobalControllerRouter["secc_api/controllers:WristbandController"],
		beego.ControllerComments{
			Method:           "Get",
			Router:           "/:deviceNo",
			AllowHTTPMethods: []string{"get"},
			MethodParams:     param.Make(),
			Filters:          nil,
			Params:           nil})

}
