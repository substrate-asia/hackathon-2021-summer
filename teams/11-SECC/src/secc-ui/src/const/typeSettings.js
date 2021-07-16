const typeSettings = {
  AccountInfo: "AccountInfoWithDualRefCount",
  PersonInfo: {
    name: "Vec<u8>",
    id_card: "Vec<u8>",
    relation_type: "u8",
    height: "u16",
    weight: "u16",
    chronic: "Vec<u8>",
  },
  WristbandInfo: {
    data_id: "Vec<u8>",
    device_no: "Vec<u8>",
    heart_rate: "u8",
    data_time: "Vec<u8>",
  },
  SleepReportInfo: {
    data_id: "Vec<u8>",
    device_no: "Vec<u8>",
    deep_sleep: "u8",
    light_sleep: "u8",
    data_time: "Vec<u8>",
  },
  SleepSignInfo: {
    data_id: "Vec<u8>",
    device_no: "Vec<u8>",
    heart_rate: "u8",
    breath_rate: "u8",
    data_time: "Vec<u8>",
  },
  DeviceType: "u8",
  RelationType: "u8",
}

export default typeSettings
