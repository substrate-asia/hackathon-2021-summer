package service

import (
	"secc_api/models"
	"secc_api/tools"
)

func QueryMedical(idCard string) []models.Medical {
	engine := tools.QueryEngine()
	applies := make([]models.Medical, 0)
	where := engine.Where("1=1").Distinct("file_hash")
	if idCard != "" {
		where.And("id_card = ?", idCard)
	}
	_ = where.Find(&applies)
	return applies
}

func AddMedical(w models.Medical) {
	engine := tools.QueryEngine()
	_, _ = engine.InsertOne(w)
}
