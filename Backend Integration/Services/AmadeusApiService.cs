using System.Net;
using System.Text;
using System.Text.Json;
using AmadeusApiIntegration;
using ApiResponses;
using Microsoft.Extensions.Caching.Distributed;

namespace Services.AmadeusApiIntegration
{
    public class AmadeusApiService : IAmadeusApiService
    {
        private string apiKey;
        private string apiSecret;
        public string? bearerToken;
        private HttpClient http;
        private readonly IDistributedCache _distributedCache;

        public AmadeusApiService(IConfiguration config, IHttpClientFactory httpFactory, IDistributedCache distributedCache)
        {
            apiKey = config.GetValue<string>("AmadeusAPI:ApiKey")!;
            apiSecret = config.GetValue<string>("AmadeusAPI:APISecret")!;
            http = httpFactory.CreateClient("AmadeusAPI");
            _distributedCache = distributedCache;

        }

        public async Task ConnectOAuth()
        {
            var message = new HttpRequestMessage(HttpMethod.Post, "/v1/security/oauth2/token");
            message.Content = new StringContent(
                $"grant_type=client_credentials&client_id={apiKey}&client_secret={apiSecret}",
                Encoding.UTF8, "application/x-www-form-urlencoded"
            );

            var results = await http.SendAsync(message);
            await using var stream = await results.Content.ReadAsStreamAsync();
            var oauthResults = await JsonSerializer.DeserializeAsync<OAuthResults>(stream);

            bearerToken = oauthResults?.access_token;
        }

        public async Task<BaseResponse> GetFlightOffers(FlightSearchCriteria sc)
        {
            var options = new DistributedCacheEntryOptions();
            options.AbsoluteExpirationRelativeToNow = TimeSpan.FromSeconds(120);
            var cacheKey = JsonSerializer.Serialize(sc);

            var cachedResult = await _distributedCache.GetStringAsync(cacheKey);
            if (cachedResult is not null)
            {
                var res = JsonSerializer.Deserialize<FlightOfferResponseDto>(cachedResult);
                return res!;
            }

            var url = GetFlightOffersAmadeusUrl(sc);
            var message = new HttpRequestMessage(HttpMethod.Get, url);

            ConfigBearerTokenHeader();
            var response = await http.SendAsync(message);
            if (response.StatusCode == HttpStatusCode.BadRequest)
            {
                var responseBody = await response.Content.ReadAsStringAsync();
                var error = JsonSerializer.Deserialize<AmadeusApiErrors>(responseBody);
                return error!;
            }
            var content = await response.Content.ReadAsStringAsync();
            await _distributedCache.SetStringAsync(cacheKey, content, options);

            var result = JsonSerializer.Deserialize<FlightOfferResponseDto>(content);

            return result!;
        }

        public async Task<BaseResponse> GetLocation(string location)
        {
            var url = $"/v1/reference-data/locations/cities?max=1&include=AIRPORTS&keyword={location}";
            var message = new HttpRequestMessage(HttpMethod.Get, url);

            ConfigBearerTokenHeader();

            var response = await http.SendAsync(message);
            if (response.StatusCode == HttpStatusCode.BadRequest)
            {
                var responseBody = await response.Content.ReadAsStringAsync();
                var error = JsonSerializer.Deserialize<AmadeusApiErrors>(responseBody);
                return error!;
            }
            var content = await response.Content.ReadAsStringAsync();
            var result = JsonSerializer.Deserialize<LocationAirportsDto>(content);

            return result!;
        }
        private string GetFlightOffersAmadeusUrl(FlightSearchCriteria sc)
        {
            var url = $"/v2/shopping/flight-offers?originLocationCode={sc.OriginLocationCode}&destinationLocationCode={sc.DestinationLocationCode}&departureDate={sc.DepartureDate}&adults={int.Parse(sc.Adults)}";

            if (sc.ReturnDate != null)
            {
                url += $"&returnDate={sc.ReturnDate}";
            }

            if (sc.CurrencyCode != null)
            {
                url += $"&currencyCode={sc.CurrencyCode}";
            }
            url += "&max=25";

            return url;
        }

        private void ConfigBearerTokenHeader()
        {
            http.DefaultRequestHeaders.Add("Authorization", $"Bearer {bearerToken}");
        }
        private class OAuthResults
        {
            public string? access_token { get; set; }
        }

    }

}