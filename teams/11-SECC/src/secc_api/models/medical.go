package models

import "time"

type Medical struct {
	DataId    string    `xorm:"pk comment('主键id') BIGINT"`
	IdCard    string    `xorm:" comment('身份证') VARCHAR(64)"`
	FileHash  string    `xorm:" comment('文件哈希') VARCHAR(256)"`
	CreatedAt time.Time `xorm:"created"`
	UpdatedAt time.Time `xorm:"updated"`
	DeletedAt time.Time `xorm:"deleted"`
}

func ConvertMedicalInfo(medical Medical) MedicalInfo {
	return MedicalInfo{IdCard: medical.IdCard, FileHash: medical.FileHash}
}
