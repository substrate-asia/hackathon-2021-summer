package models

//// HealthBlindInfo 绑定老人健康信息
//type HealthBlindInfo struct {
//	Name    string `json:"name"`
//	IdCard  string `json:"id_card"`
//	Height  uint32 `json:"height"`
//	Weight  uint32 `json:"weight"`
//	Chronic string `json:"chronic"`
//}

// WristbandInfo 智能手环数据
type WristbandInfo struct {
	DataId    string `json:"data_id"`
	DeviceNo  string `json:"device_no"`
	HeartRate uint16 `json:"heart_rate"`
	DataTime  string `json:"data_time"`
}

// SleepReportInfo 睡眠报告数据
type SleepReportInfo struct {
	DataId     string `json:"data_id"`
	DeviceNo   string `json:"device_no"`
	DeepSleep  uint8  `json:"deep_sleep"`
	LightSleep uint8  `json:"light_sleep"`
	DataTime   string `json:"data_time"`
}

// SleepSignInfo 睡眠体征数据
type SleepSignInfo struct {
	DataId     string `json:"data_id"`
	DeviceNo   string `json:"device_no"`
	HeartRate  uint16 `json:"heart_rate"`
	BreathRate uint16 `json:"breath_rate"`
	DataTime   string `json:"data_time"`
}

// MedicalInfo 医疗数据
type MedicalInfo struct {
	FileHash string `json:"file_hash"`
	IdCard   string `json:"id_card"`
}
