function getSidebarFreeSpace(): number {
    let $sidebar = $("#sidebar");
    let $el = $sidebar.find("li").last();
    var lastElementBottom = $el.offset().top + $el.height();
    return $sidebar.offset().top + $sidebar.height() - lastElementBottom;
}

function adjustSidebarToWindowSize() {
    let $sidebar = $("#sidebar");
    let $images = $sidebar.find("img");
    let $spacers = $sidebar.find(".sidebar-spacer");
    let $menuText = $sidebar.find(".sidebar-menu-text");

    function imagesAreBig() {
        return $images.height() >= 50;
    }

    // show until fit
    if (!imagesAreBig() && getSidebarFreeSpace() >= $images.length * 20) {
        $images.height(50);
        $images.width(50);
        $sidebar.css("width", 80);
        $("#content-block").css("padding-left", 80);
    }
    if (!$menuText.is(":visible") && imagesAreBig() && getSidebarFreeSpace() >= 100) {
        $menuText.show();
        $sidebar.find("a").css("margin-bottom", "5");
    }
    if (!$spacers.is(":visible") && $menuText.is(":visible") && getSidebarFreeSpace() >= 150) {
        $spacers.show();
    }

    // hide until does not fit
    if ($spacers.is(":visible") && getSidebarFreeSpace() < 0) {
        $spacers.hide();
    }
    if ($menuText.is(":visible") && getSidebarFreeSpace() < 0) {
        $sidebar.find("a").css("margin-bottom", "0");
        $menuText.hide();
    }
    if (imagesAreBig() && getSidebarFreeSpace() < 0) {
        $images.height(30);
        $images.width(30);
        $sidebar.css("width", 50);
        $("#content-block").css("padding-left", 50);
    }
}

function initSidebar() {
    $(document).ready(adjustSidebarToWindowSize);
    $(window).resize(adjustSidebarToWindowSize);
}

export default {
    initSidebar: initSidebar,
}