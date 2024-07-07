export const crops = {
    "Wheat (गेहूं)": ["HD 2967", "PBW 343", "WH 1105", "DBW 88"],
    "Rice (धान)": ["Basmati 370", "IR 64", "Swarna", "Pusa Basmati 1121"],
    "Maize (Corn) (मक्का)": ["HQPM 1", "HM-4", "Shaktiman-1", "Prabal"],
    "Bajra (Pearl Millet) (बाजरा)": ["HHB 67", "ICTP 8203", "RHB 121", "MH 169"],
    "Jowar (Sorghum) (ज्वार)": ["CSV 15", "CSH 16", "M 35-1", "SPV 462"],
    "Pulses (दालें)": [
        "Chickpeas (चना)",
        "Lentils (मसूर)",
        "Tur (Arhar) (तूर)",
        "Moong (मूंग)",
        "Urad (Black Gram) (उड़द)",
    ],
    "Sugarcane (गन्ना)": ["Co 0238", "Co 86032", "CoJ 64", "Co 0118"],
    "Cotton (कपास)": ["Bunny", "RCH 2", "BT Cotton", "H 8"],
    "Soybean (सोयाबीन)": ["JS 335", "PK 472", "MACS 450", "NRC 37"],
    "Mustard (सरसों)": ["Pusa Bold", "Rohini", "NRCHB 101", "Varuna"],
    "Garlic (लहसुन)": ["Yamuna Safed", "G1", "G50", "G282"]
}

export type Icrops = keyof typeof crops;
