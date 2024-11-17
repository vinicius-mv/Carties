using System.Security.Claims;

namespace AuctionService.UnitTests.Utils;

public class Helpers
{
    public static ClaimsPrincipal GetClaimsPrincipal()
    {
        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.Name, "testUser"),
            new Claim(ClaimTypes.NameIdentifier, Guid.NewGuid().ToString())
        };
        var identity = new ClaimsIdentity(claims, "testAuth");
        var claimsPrincipal = new ClaimsPrincipal(identity);
        return claimsPrincipal;
    }
}
