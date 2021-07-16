package tools

import "time"

func GetWeekStr() []string {
	var weekStr []string
	currentTime := time.Now()
	for i := 1; i <= 7; i++ {
		weekStr = append(weekStr, currentTime.AddDate(0, 0, -i).Format("2006-01-02"))
	}
	return weekStr
}
