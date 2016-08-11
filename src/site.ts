import site from "./api/site-def";
import "./api/parsley-translations";
import SiteUtils from "./api/site-utils";
import SongView from "./api/song-view";
import Tuner from "./api/tuner";

site.Tuner = Tuner;
site.Utils = SiteUtils;
site.SongView = SongView;

(<any>window).$site = site;

