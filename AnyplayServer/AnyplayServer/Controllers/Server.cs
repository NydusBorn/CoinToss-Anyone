using Microsoft.AspNetCore.Mvc;

namespace AnyplayServer.Controllers;

[ApiController]
[Route("Users")]
public class Server
{
    [HttpGet("GetUserExists")]
    public bool UserExists([FromQuery] string username)
    {
        if (username == "john doe")
        {
            return true;
        }
        else
        {
            return false;
        }
    }
}