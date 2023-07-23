using AmadeusApiIntegration;

public interface IAmadeusApiService
{
    public Task ConnectOAuth();
    public Task<BaseResponse> GetFlightOffers(FlightSearchCriteria sc);
    public Task<BaseResponse> GetLocation(string location);

}



