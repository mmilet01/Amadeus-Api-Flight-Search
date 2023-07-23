namespace AmadeusApiIntegration
{
    public class LocationAirportsDto : BaseResponse
    {
        public Included? included { get; set; }
    }

    public class Included
    {
        public Dictionary<string, Airport>? airports { get; set; }
    }

    public class Airport
    {
        public string? name { get; set; }
        public string? iataCode { get; set; }
    }

}
