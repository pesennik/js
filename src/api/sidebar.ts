function getSidebarFreeSpace(): number {
    let $el = $("#sidebar-wrapper").find("li").last();
    var sidebarBottom = $el.offset().top + $el.height();
    return $(window).height() - sidebarBottom;
}

function adjustSidebarToWindowSize() {
    let $sidebar = $("#sidebar-wrapper");
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
    }
    if (!$menuText.is(":visible") && imagesAreBig() && getSidebarFreeSpace() >= 100) {
        $menuText.show();
    }
    if (!$spacers.is(":visible") && $menuText.is(":visible") && getSidebarFreeSpace() >= 150) {
        $spacers.show();
    }

    // hide until does not fit
    if ($spacers.is(":visible") && getSidebarFreeSpace() < 0) {
        $spacers.hide();
    }
    if ($menuText.is(":visible") && getSidebarFreeSpace() < 0) {
        $menuText.hide();
    }
    if (imagesAreBig() && getSidebarFreeSpace() < 0) {
        $images.height(30);
        $images.width(30);
    }
}

function initSidebar() {
    $(document).ready(adjustSidebarToWindowSize);
    $(window).resize(adjustSidebarToWindowSize)
}

export default {
    initSidebar: initSidebar,
}