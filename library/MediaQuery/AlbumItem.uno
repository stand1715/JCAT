using Uno;
using Uno.UX;
using Uno.Text;
using Uno.Threading;
using Uno.Collections;
using Uno.Compiler.ExportTargetInterop;
using Fuse;
using Fuse.Scripting;

namespace Fuse.MediaQuery
{
    public sealed class AlbumItem
    {
        public string Name;
        public string Artist;

        public AlbumItem(string name, string artist)
        {
            Name = name;
            Artist = artist;
        }
    }

    class AlbumPromise : Promise<List<AlbumItem>>
    {
        List<AlbumItem> _results = new List<AlbumItem>();

        protected void Resolve()
        {
            Resolve(_results);
        }

        protected void Reject(string message)
        {
            Reject(new Exception(message));
        }

        protected void PushResult(string name, string artist)
        {
            _results.Add(new AlbumItem(name, artist));
        }
    }
}
