import site from "./api/site-def";
import "./api/parsley-translations";
import SiteUtils from "./api/site-utils";

/** Set of utility functions */
site.Utils = SiteUtils;

(<any>window).$site = site;

