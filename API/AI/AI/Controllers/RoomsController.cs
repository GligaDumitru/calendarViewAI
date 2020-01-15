using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace AI.Controllers
{
    public class RoomsController : ApiController
    {
        string json;
        public string Get()
        {
            return json;
        }

        [Route("rooms/all")]
        [HttpPost]
        public async Task<string> PostRawBufferManual()
        {
            string result = await Request.Content.ReadAsStringAsync();

            return result;
        }

        //[HttpPost]
        //public IHttpActionResult All([FromBody] string s)
        //{
        //    List<string> movies = new List<string>();
        //    movies.Add("okok");
        //    movies.Add("okok1");
        //    movies.Add("okok2");
        //    movies.Add(s);
        //    return Ok(movies);
        //}
    }
}