using ApiResponses;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OutputCaching;
using Microsoft.Extensions.Caching.Distributed;

namespace AmadeusApiIntegration.Controllers;

[ApiController]
[Route("[controller]")]
public class AmadeusApiController : ControllerBase
{
    private readonly ILogger<AmadeusApiController> _logger;
    private readonly IAmadeusApiService _amadeusApiClient;
    private readonly IDistributedCache _distributedCache;

    public AmadeusApiController(ILogger<AmadeusApiController> logger, IAmadeusApiService amadeusApiClient, IDistributedCache distributedCache)
    {
        _logger = logger;
        _amadeusApiClient = amadeusApiClient;
        _distributedCache = distributedCache;
    }

    [HttpGet("flight-offers")]
    [OutputCache(PolicyName = "FlightResultsCache")]
    public async Task<IActionResult> Get(
        [FromQuery] string originLocationCode,
        [FromQuery] string destinationLocationCode,
        [FromQuery] string departureDate,
        [FromQuery] string? returnDate,
        [FromQuery] string adults,
        [FromQuery] string? currencyCode
    )
    {
        var searchCriteria = new FlightSearchCriteria
        {
            OriginLocationCode = originLocationCode,
            DestinationLocationCode = destinationLocationCode,
            DepartureDate = departureDate,
            ReturnDate = returnDate,
            Adults = adults,
            CurrencyCode = currencyCode
        };
        try
        {
            await _amadeusApiClient.ConnectOAuth();
            var results = await _amadeusApiClient.GetFlightOffers(searchCriteria);
            if (results is AmadeusApiErrors)
            {
                return BadRequest(results);
            }

            return Ok(results);

        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);

        }
    }

    [HttpGet("cities")]
    public async Task<IActionResult> Get(
        [FromQuery] string keyword
    )
    {
        try
        {
            await _amadeusApiClient.ConnectOAuth();
            var results = await _amadeusApiClient.GetLocation(keyword);
            if (results is AmadeusApiErrors)
            {
                return BadRequest(results);
            }

            return Ok(results);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}
