namespace AmadeusApiIntegration
{
    public class FlightSearchCriteria
    {
        public string OriginLocationCode { get; set; } = string.Empty;
        public string DestinationLocationCode { get; set; } = string.Empty;
        public string DepartureDate { get; set; } = string.Empty;
        public string Adults { get; set; } = string.Empty;
        public string? ReturnDate { get; set; }
        public string? CurrencyCode { get; set; }
    }
}
