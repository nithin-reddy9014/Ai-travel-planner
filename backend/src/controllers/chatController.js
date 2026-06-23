const Trip = require("../models/Trip");

const ai = require("../config/gemini");

const askTripAssistant = async (req, res) => {
  try {
    const { tripId, question } = req.body;

    const trip = await Trip.findOne({
      _id: tripId,
      userId: req.user._id,
    });

    if (!trip) {
      return res.status(404).json({
        message: "Trip not found",
      });
    }

    const prompt = `
Trip Information:

Destination:
${trip.destination}

Itinerary:
${JSON.stringify(trip.itinerary)}

User Question:
${question}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    res.json({
      answer: response.text,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  askTripAssistant,
};
