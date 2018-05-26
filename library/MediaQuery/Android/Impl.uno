using Uno;
using Uno.UX;
using Uno.Text;
using Uno.Threading;
using Uno.Collections;
using Uno.Permissions;
using Uno.Compiler.ExportTargetInterop;
using Fuse.Scripting;

namespace Fuse.MediaQuery
{
    //------------------------------------------------------------
    // Tracks

    [ForeignInclude(Language.Java, "android.content.ContentResolver")]
    [ForeignInclude(Language.Java, "android.database.Cursor")]
    [ForeignInclude(Language.Java, "android.provider.MediaStore")]
    [ForeignInclude(Language.Java, "com.fuse.MediaQuery.MMQB")]
    extern(Android)
    class TrackQuery : TrackPromise
    {
        string _path;
        string _title;
        string _artist;
        string _album;

        public TrackQuery(string title, string artist, string album)
        {
            _artist = artist;
            var permissionPromise = Permissions.Request(Permissions.Android.WRITE_EXTERNAL_STORAGE);
            permissionPromise.Then(OnPermitted, OnRejected);
        }

        [Foreign(Language.Java)]
        public void QueryInner(string r_title, string r_artist, string r_album)
        @{
            MMQB qb = MMQB.Tracks();

            if (r_title!=null)
                qb.AndTitle(r_title);

            if (r_artist!=null)
                qb.AndArtist(r_artist);

            if (r_album!=null)
                qb.AndArtist(r_album);

            String sortOrder = MediaStore.Audio.Media.TITLE + " ASC";

            ContentResolver cr = com.fuse.Activity.getRootActivity().getContentResolver();
            Cursor cur = cr.query(MediaStore.Audio.Media.EXTERNAL_CONTENT_URI, null, qb.Build(), null, sortOrder);
            if(cur != null)
            {
                while(cur.moveToNext())
                {
                    String path = cur.getString(cur.getColumnIndex(MediaStore.Audio.Media.DATA));
                    String title = cur.getString(cur.getColumnIndex(MediaStore.Audio.Media.TITLE));
                    String artist = cur.getString(cur.getColumnIndex(MediaStore.Audio.Media.ARTIST));
                    String album = cur.getString(cur.getColumnIndex(MediaStore.Audio.Media.ALBUM));
                    double duration = ((double)cur.getLong(cur.getColumnIndex(MediaStore.Audio.Media.DURATION)))/1000.0;
                    @{TrackQuery:Of(_this).PushResult(string,string,string,string,double):Call(path,title,artist,album,duration)};
                }
            }
            cur.close();
        @}

        void OnPermitted(PlatformPermission permission)
        {
            QueryInner(_title, _artist, _album);
            Resolve();
        }

        void OnRejected(Exception e)
        {
            Reject("StreamingPlayer was not given permissions to play local files: " + e.Message);
        }
    }

    //------------------------------------------------------------
    // Artists

    [ForeignInclude(Language.Java, "android.content.ContentResolver")]
    [ForeignInclude(Language.Java, "android.database.Cursor")]
    [ForeignInclude(Language.Java, "android.provider.MediaStore")]
    [ForeignInclude(Language.Java, "com.fuse.MediaQuery.MMQB")]
    extern(Android)
    class ArtistQuery : ArtistPromise
    {
        string _name;

        public ArtistQuery(string name)
        {
            _name = name;
            var permissionPromise = Permissions.Request(Permissions.Android.WRITE_EXTERNAL_STORAGE);
            permissionPromise.Then(OnPermitted, OnRejected);
        }

        [Foreign(Language.Java)]
        public void QueryInner(string r_name)
        @{
            MMQB qb = MMQB.Artists();

            if (r_name != null)
                qb.AndArtist(r_name);

            String selection = qb.Build();

            String sortOrder = MediaStore.Audio.Media.ARTIST + " ASC";

            ContentResolver cr = com.fuse.Activity.getRootActivity().getContentResolver();
            Cursor cur = cr.query(MediaStore.Audio.Artists.EXTERNAL_CONTENT_URI, null, qb.Build(), null, sortOrder);

            if(cur != null)
            {
                while(cur.moveToNext())
                {
                    String artist = cur.getString(cur.getColumnIndex(MediaStore.Audio.Artists.ARTIST));
                    @{ArtistQuery:Of(_this).PushResult(string):Call(artist)};
                }
            }
            cur.close();
        @}

        void OnPermitted(PlatformPermission permission)
        {
            QueryInner(_name);
            Resolve();
        }

        void OnRejected(Exception e)
        {
            Reject("StreamingPlayer was not given permissions to play local files: " + e.Message);
        }
    }

    //------------------------------------------------------------
    // Albums

    [ForeignInclude(Language.Java, "android.content.ContentResolver")]
    [ForeignInclude(Language.Java, "android.database.Cursor")]
    [ForeignInclude(Language.Java, "android.provider.MediaStore")]
    [ForeignInclude(Language.Java, "com.fuse.MediaQuery.MMQB")]
    extern(Android)
    class AlbumQuery : AlbumPromise
    {
        string _name;
        string _artist;

        public AlbumQuery(string name, string artist)
        {
            _name = name;
            _artist = artist;
            var permissionPromise = Permissions.Request(Permissions.Android.WRITE_EXTERNAL_STORAGE);
            permissionPromise.Then(OnPermitted, OnRejected);
        }

        [Foreign(Language.Java)]
        public void QueryInner(string r_name, string r_artist)
        @{
            MMQB qb = MMQB.Albums();

            if (r_artist!=null)
                qb.AndArtist(r_artist);

            if (r_name!=null)
                qb.AndAlbum(r_name);

            String sortOrder = MediaStore.Audio.Media.ALBUM + " ASC";
            ContentResolver cr = com.fuse.Activity.getRootActivity().getContentResolver();
            Cursor cur = cr.query(MediaStore.Audio.Albums.EXTERNAL_CONTENT_URI, null, qb.Build(), null, sortOrder);

            if(cur != null)
            {
                while(cur.moveToNext())
                {
                    String name = cur.getString(cur.getColumnIndex(MediaStore.Audio.Albums.ALBUM));
                    String artist = cur.getString(cur.getColumnIndex(MediaStore.Audio.Artists.ARTIST));
                    @{AlbumQuery:Of(_this).PushResult(string,string):Call(name, artist)};
                }
            }
            cur.close();
        @}

        void OnPermitted(PlatformPermission permission)
        {
            QueryInner(_name, _artist);
            Resolve();
        }

        void OnRejected(Exception e)
        {
            Reject("StreamingPlayer was not given permissions to play local files: " + e.Message);
        }
    }
}
