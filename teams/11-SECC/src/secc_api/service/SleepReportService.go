package service

import (
	"secc_api/models"
	"secc_api/tools"
)

func QuerySleepReport(deviceNo string) []models.SleepReport {
	engine := tools.QueryEngine()
	applies := make([]models.SleepReport, 0)
	where := engine.In("data_time", tools.GetWeekStr()).OrderBy("data_time")
	if deviceNo != "" {
		where.And("device_no = ?", deviceNo)
	}
	_ = where.Find(&applies)
	return applies
}

func AddSleepReport(w models.SleepReport) {
	engine := tools.QueryEngine()
	_, _ = engine.InsertOne(w)
}
