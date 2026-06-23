// const ai = require("../config/gemini");

// const generateTripPlan = async (destination, days, budgetType, interests) => {
//   const prompt = `
// Generate a travel plan.

// Destination: ${destination}
// Days: ${days}
// Budget: ${budgetType}

// Interests:
// ${interests.join(", ")}

// Return ONLY valid JSON.

// {
//   "itinerary": {
//     "day1": [],
//     "day2": []
//   },
//   "budgetEstimate": {
//     "flights": "",
//     "accommodation": "",
//     "food": "",
//     "activities": "",
//     "total": ""
//   },
//   "hotels": [],
//   "packingList": [],
//   "travelTips": []
// }
// `;

//   const response = await ai.models.generateContent({
//     model: "gemini-2.5-flash",
//     contents: prompt,
//   });

//   let text = response.text;

//   text = text
//     .replace(/```json/g, "")
//     .replace(/```/g, "")
//     .trim();

//   return JSON.parse(text);
// };

// const regenerateDayPlan = async (
//   destination,
//   dayNumber,
//   interests,
//   customPrompt,
// ) => {
//   const prompt = `
// Destination: ${destination}

// Regenerate Day ${dayNumber}

// Interests:
// ${interests.join(", ")}

// Extra Request:
// ${customPrompt}

// Return ONLY JSON

// {
//  "activities":[]
// }
// `;

//   const response = await ai.models.generateContent({
//     model: "gemini-2.5-flash",
//     contents: prompt,
//   });

//   let text = response.text;

//   text = text
//     .replace(/```json/g, "")
//     .replace(/```/g, "")
//     .trim();

//   return JSON.parse(text);
// };

// module.exports = {
//   generateTripPlan,
//   regenerateDayPlan,
// };

const ai = require("../config/gemini");

const generateTripPlan = async (destination, days, budgetType, interests) => {
  try {
    const prompt = `
Generate a detailed ${days}-day travel itinerary.

Destination: ${destination}
Budget Type: ${budgetType}
Interests: ${interests.join(", ")}

IMPORTANT:
Return ONLY valid JSON.
Do not include explanations.
Do not include markdown.
Do not include \`\`\`json.

Expected format:

{
  "itinerary": {
    "Day 1": [
      "Activity 1",
      "Activity 2",
      "Activity 3"
    ]
  },
  "budgetEstimate": {
    "flights": "$400",
    "accommodation": "$300",
    "food": "$150",
    "activities": "$100",
    "total": "$950"
  },
  "hotels": [
    "Hotel 1",
    "Hotel 2",
    "Hotel 3"
  ],
  "packingList": [
    "Passport",
    "Power Bank"
  ],
  "travelTips": [
    "Book tickets in advance"
  ]
}

Generate exactly ${days} days.
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    let text =
      typeof response.text === "function" ? response.text() : response.text;

    console.log("RAW GEMINI RESPONSE:");
    console.log(text);

    if (!text) {
      throw new Error("Gemini returned empty response");
    }

    const cleanedText = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const parsed = JSON.parse(cleanedText);

    console.log("PARSED GEMINI DATA:");
    console.dir(parsed, {
      depth: null,
    });

    return {
      itinerary: parsed.itinerary || {},

      budgetEstimate: parsed.budgetEstimate || {},

      hotels: parsed.hotels || [],

      packingList: parsed.packingList || [],

      travelTips: parsed.travelTips || [],
    };
  } catch (error) {
    console.error("Gemini Error:", error);

    return {
      itinerary: {
        "Day 1": ["Explore local attractions"],
      },

      budgetEstimate: {
        flights: "N/A",
        accommodation: "N/A",
        food: "N/A",
        activities: "N/A",
        total: "N/A",
      },

      hotels: [],

      packingList: [],

      travelTips: ["Unable to generate AI trip plan"],
    };
  }
};

module.exports = {
  generateTripPlan,
};
