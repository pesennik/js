let forceShowMenu = false;
function adjustSidebarToWindowSize() {
    let $sidebar = $("#sidebar");
    let $sidebarToggle = $("#sidebar-toggle");
    let $images = $sidebar.find("img");
    let $spacers = $sidebar.find(".sidebar-spacer");
    let $menuText = $sidebar.find(".sidebar-menu-text");
    let $contentBlock = $("#content-block");

    if (window.innerWidth < 800 && !forceShowMenu) {
        $sidebar.fadeOut(700);
        $sidebarToggle.fadeIn();
        $contentBlock.css("padding-left", 0);
        return;
    }
    $sidebar.fadeIn();
    $sidebarToggle.fadeOut();
    $contentBlock.css("padding-left", $sidebar.css("width"));

    let $bottomBlock = $sidebar.find(".sidebar-bottom-block");
    $bottomBlock.removeClass("sidebar-bottom")

    function imagesAreBig() {
        return $images.height() >= 50;
    }

    function getSidebarFreeSpace(): number {
        let $el = $sidebar.find(".sidebar-nav div").last();
        let lastElementBottom = $el.offset().top + $el.height();
        return $sidebar.offset().top + $sidebar.height() - lastElementBottom;
    }

    // First: show until fit
    if (!imagesAreBig() && getSidebarFreeSpace() >= $images.length * 20) {
        $images.height(50);
        $images.width(50);
        $sidebar.css("width", 80);
        $contentBlock.css("padding-left", 80);
    }
    if (!$menuText.is(":visible") && imagesAreBig() && getSidebarFreeSpace() >= 20 * $sidebar.find("a").length) {
        $menuText.show();
        $sidebar.find("a").css("margin-bottom", "5");
    }
    if (!$spacers.is(":visible") && $menuText.is(":visible") && getSidebarFreeSpace() >= 50 * $spacers.length) {
        $spacers.show();
    }
    if (getSidebarFreeSpace() > 0) {
        $bottomBlock.addClass("sidebar-bottom")
    }

    // Next: hide until does not fit
    if ($spacers.is(":visible") && getSidebarFreeSpace() < 0) {
        $spacers.hide();
    }
    if ($menuText.is(":visible") && getSidebarFreeSpace() < 0) {
        $sidebar.find("a").css("margin-bottom", "0");
        $menuText.hide();
    }
    if (getSidebarFreeSpace() < 0) {
        $bottomBlock.removeClass("sidebar-bottom")
    }
    if (imagesAreBig() && getSidebarFreeSpace() < 0) {
        $images.height(30);
        $images.width(30);
        $sidebar.css("width", 50);
        $contentBlock.css("padding-left", 50);
    }
}

function initSidebar() {
    $(document).ready(adjustSidebarToWindowSize);
    $(window).resize(adjustSidebarToWindowSize);

    $("#sidebar-toggle").click((e) => {
        forceShowMenu = true;
        adjustSidebarToWindowSize();
        e.originalEvent["forceShowMenuClick"] = true;
    });

    function handleTouchAndClick(e) {
        if (forceShowMenu && !e["forceShowMenuClick"]) {
            forceShowMenu = false;
            adjustSidebarToWindowSize();
        }
    }

    document.body.addEventListener("click", handleTouchAndClick);
    document.body.addEventListener("touchmove", handleTouchAndClick);
}

export default {
    initSidebar: initSidebar,
}