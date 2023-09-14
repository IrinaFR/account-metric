
export default interface Contragent{
	id: number,
	core_id: number,
	date: string,
	name: string,
	status: number,
	visits: number,
	revenue: number,
	average_check: number,
	bot: boolean,
	sms: boolean,
	executor_current: number,
	executor_max: number,
	day?: number,
	loss?: boolean
}
