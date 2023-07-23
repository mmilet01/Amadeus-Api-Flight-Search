namespace AmadeusApiIntegration
{
    public class AmadeusApiErrors : BaseResponse
    {
        public class Error
        {
            public int status { get; set; }
            public string detail { get; set; } = string.Empty;
            public string title { get; set; } = string.Empty;
        }
        public List<Error> errors { get; set; } = new List<Error> { };
        public int status => errors[0].status;
        public bool isSuccess { get; set; } = false;
        public bool isAmadeusApiError { get; set; } = true;
    }
}