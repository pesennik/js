function isSidebarFitsToWindow() {
    return false;
}

function adjustSidebarToWindowSize() {
    //apply default style -> show splitters, default icons & text labels
    if (isSidebarFitsToWindow()) {
        return;
    }
    // shrink/hide splitters
    if (isSidebarFitsToWindow()) {
        return;
    }
    // hide text labels
    if (isSidebarFitsToWindow()) {
        return;
    }
    //shrink images

}

function initSidebar() {
    $(document).ready(adjustSidebarToWindowSize);
    $(window).resize(adjustSidebarToWindowSize)
}

export default {
    initSidebar: initSidebar,
}