namespace ApiResponses
{
    public class FlightOfferResponseDto : BaseResponse
    {
        public List<FlightOffer>? data { get; set; } // data.length -> number of possible flights from A-C
    }

    public class FlightOffer
    {
        public string type { get; set; } = string.Empty;
        public string id { get; set; } = string.Empty;
        public bool oneWay { get; set; }
        public List<Itinerary>? itineraries { get; set; }
        public Price? price { get; set; }
        public List<TravelerPricings>? travelerPricings { get; set; }
    }

    public class TravelerPricings
    {
        public string travelerId { get; set; } = string.Empty;
        public string travelerType { get; set; } = string.Empty;
    }

    public class Itinerary
    {
        public List<Segment>? segments { get; set; }
        public string duration { get; set; } = string.Empty;
    }

    public class Segment
    {
        public string id { get; set; } = string.Empty;
        public Location? departure { get; set; }
        public Location? arrival { get; set; }
        public string carrierCode { get; set; } = string.Empty;
        public string duration { get; set; } = string.Empty;
        public int numberOfStops { get; set; }
    }

    public class Price
    {
        public string currency { get; set; } = string.Empty;
        public string total { get; set; } = string.Empty;
    }

    public class Location
    {
        public string iataCode { get; set; } = string.Empty;
        public string at { get; set; } = string.Empty;
    }
}