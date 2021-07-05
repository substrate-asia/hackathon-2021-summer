package models

import "time"

type Wristband struct {
	DataId    string    `xorm:"pk comment('主键id') BIGINT"`
	DataTime  string    `xorm:"not null comment('数据时间') VARCHAR(32)"`
	DeviceNo  string    `xorm:"not null comment('设备标识') VARCHAR(128)"`
	HeartRate uint16    `xorm:"comment('心率') BIGINT"`
	CreatedAt time.Time `xorm:"created"`
	UpdatedAt time.Time `xorm:"updated"`
	DeletedAt time.Time `xorm:"deleted"`
}

func ConvertWristbandInfo(wristband Wristband) WristbandInfo {
	return WristbandInfo{DataId: wristband.DataId, DeviceNo: wristband.DeviceNo, HeartRate: wristband.HeartRate, DataTime: wristband.DataTime}
}
