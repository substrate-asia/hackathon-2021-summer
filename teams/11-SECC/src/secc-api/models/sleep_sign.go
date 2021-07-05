package models

import "time"

type SleepSign struct {
	DataId     string    `xorm:"pk comment('主键id') BIGINT"`
	DataTime   string    `xorm:"not null comment('数据时间') VARCHAR(32)"`
	DeviceNo   string    `xorm:"not null comment('设备标识') VARCHAR(128)"`
	HeartRate  uint16    `xorm:"comment('心率') BIGINT"`
	BreathRate uint16    `xorm:"comment('呼吸') BIGINT"`
	CreatedAt  time.Time `xorm:"created"`
	UpdatedAt  time.Time `xorm:"updated"`
	DeletedAt  time.Time `xorm:"deleted"`
}

func ConvertSleepSignInfo(sleepSign SleepSign) SleepSignInfo {
	return SleepSignInfo{DataId: sleepSign.DataId, DeviceNo: sleepSign.DeviceNo, HeartRate: sleepSign.HeartRate, BreathRate: sleepSign.BreathRate, DataTime: sleepSign.DataTime}
}
