package models

import "time"

type SleepReport struct {
	DataId     string    `xorm:"pk comment('主键id') BIGINT"`
	DataTime   string    `xorm:"not null comment('数据时间') VARCHAR(32)"`
	DeviceNo   string    `xorm:"not null comment('设备标识') VARCHAR(128)"`
	DeepSleep  uint8     `xorm:"comment('深睡') BIGINT"`
	LightSleep uint8     `xorm:"comment('浅睡') BIGINT"`
	CreatedAt  time.Time `xorm:"created"`
	UpdatedAt  time.Time `xorm:"updated"`
	DeletedAt  time.Time `xorm:"deleted"`
}

func ConvertSleepReportInfo(sleepReport SleepReport) SleepReportInfo {
	return SleepReportInfo{DataId: sleepReport.DataId, DeviceNo: sleepReport.DeviceNo, DeepSleep: sleepReport.DeepSleep, LightSleep: sleepReport.LightSleep, DataTime: sleepReport.DataTime}
}
