import site from "./api/site-def";

import "./api/parsley-translations";
import SiteUtils from "./api/site-utils";
import Tuner from "./api/tuner";

site.Tuner = Tuner;
site.Utils = SiteUtils;

(<any>window).$site = site;

