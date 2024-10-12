interface PersonData {
	weight: number; // en kilogramos
	height: number; // en centímetros
	gender: "male" | "female" | string; // 'male' para hombres, 'female' para mujeres,
	age: number;
}

export function calculateFatPercentage(data: PersonData): number {
	const { weight, height, gender, age = 30 } = data;

	// Fórmula de Brozek para hombres
	if (gender === "male") {
		const fatMass = weight - 0.3281 * height + 0.33929 * age - 29.5336;
		return (fatMass / weight) * 100;
	}

	// Fórmula de Brozek para mujeres
	if (gender === "female") {
		const fatMass = weight - 0.29569 * height + 0.41813 * age - 21.0444;
		return (fatMass / weight) * 100;
	}

	return 0; // En caso de que el género no sea válido
}
