package service

import (
	"secc_api/models"
	"secc_api/tools"
)

func QuerySleepSign(deviceNo string) []models.SleepSign {
	engine := tools.QueryEngine()
	applies := make([]models.SleepSign, 0)
	where := engine.In("data_time", tools.GetWeekStr()).OrderBy("data_time")
	if deviceNo != "" {
		where.And("device_no = ?", deviceNo)
	}
	_ = where.Find(&applies)
	return applies
}

func AddSleepSign(w models.SleepSign) {
	engine := tools.QueryEngine()
	_, _ = engine.InsertOne(w)
}
