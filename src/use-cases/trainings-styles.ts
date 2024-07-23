export const TrainingResumeCardStyles = {
	COMPLETED: {
		card: "border-jungle-green-400 bg-white",
		label: "border-b-4 border-jungle-green-500 hover:bg-jungle-green-500 hover:text-white transition",
		labelText: "text-green",
	},
	CREATED: {
		card: "border-android-green-300 bg-gray-50 border-b-2 border-t-2 border-r-2",
		label: "",
		labelText: "",
	},
	PAUSED: {
		card: "border-android-green-300 bg-gray-50 border-b-2 border-t-2 border-r-2",
		label: "",
		labelText: "",
	},
	RESERVED: {
		card: "border-android-green-300 bg-gray-50 border-b-2 border-t-2 border-r-2",
		label: "",
		labelText: "",
	},
	"NOT APPLY": {
		card: "border-red-360-400 bg-gray-50",
		label: "border-b-4 border-red-360-500",
		labelText: "",
	},
	"IN PROGRESS": {
		card: "border-teal-300 bg-teal-100",
		label: "border-teal-400 border-b-4",
		labelText: "text-teal-400",
	},
	IsNotActive: "bg-slate-300",
	CANCELED: {
		card: "border-red-360-400 bg-gray-50",
		label: "border-b-4 border-red-500",
		labelText: "text-red-500",
	},
};

export const TrainingTimeLinePillStyles = {
	READY: {
		pill: "bg-[#20C997]",
		text: "text-white",
	},
	OMMITED: {
		pill: "bg-red-canceled-500",
		text: "text-white",
	},
	"IN PROGRESS": {
		pill: "bg-[#17A2B8]",
		text: "text-white",
	},
	PENDING: {
		pill: "bg-[#F4F4F4]",
		text: "text-[#C0C0C0]",
	},
};
