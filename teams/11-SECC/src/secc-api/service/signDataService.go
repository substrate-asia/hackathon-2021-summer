package service

import (
	"encoding/json"
	"secc_api/models"
)

// SaveSleepSignInfo 保存睡眠体征数据/**
func SaveSleepSignInfo(info models.SleepSignInfo) {
	decodeString, _ := json.Marshal(info)
	CallMethod("SignData.save_sleep_sign_info", decodeString)
}

// SaveMedicalInfo 保存体检报告数据/**
func SaveMedicalInfo(info models.MedicalInfo) {
	CallMethod("SignData.save_medical_info", info.FileHash, info.IdCard)
}

// SaveSleepReportInfo 保存睡眠报告数据/**
func SaveSleepReportInfo(info models.SleepReportInfo) {
	decodeString, _ := json.Marshal(info)
	CallMethod("SignData.save_sleep_report_info", decodeString)
}

// SaveWristbandInfo 保存手环心率数据/**
func SaveWristbandInfo(info models.WristbandInfo) {
	decodeString, _ := json.Marshal(info)
	CallMethod("SignData.save_wristband_info", decodeString)
}
