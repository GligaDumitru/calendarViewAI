using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace AI
{
    public class AppDataAccess
    {
        public T Read<T>(string path)
        {
            T x = JsonConvert.DeserializeObject<T>(ReadFile(path));
            return x;
        }

        private string ReadFile(string path)
        {
            string text = System.IO.File.ReadAllText(path);
            return text;
        }
    }
}
