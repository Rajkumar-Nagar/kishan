export const statesWithDistricts = {
    "Rajasthan": ["Ajmer", "Jaipur", "Jodhpur", "Udaipur", "Kota"],
    "Punjab": ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda"],
    "Madhya Pradesh": ["Indore", "Bhopal", "Jabalpur", "Gwalior", "Ujjain"],
    "Bihar": ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Darbhanga"],
    "Haryana": ["Faridabad", "Gurgaon", "Rohtak", "Hisar", "Panipat"],
    "Uttar Pradesh": ["Lucknow", "Kanpur", "Varanasi", "Agra", "Meerut"]
};

export type IStatesWithDistricts = keyof typeof statesWithDistricts;