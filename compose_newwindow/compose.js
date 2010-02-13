/**
 * compose_newwindow - Compose(Reply/Forward) in a New Window
 *
 * @version 1.05 (20100212)
 * @author Karl McMurdo (user xrxca on roundcubeforum.net)
 * @url http://github.com/xrxca/cnw
 * @copyright (c) 2010 Karl McMurdo
 *
 */

// Try opening a new window if our name is wrong, this 
// can have some real issues with popup blockers
if (self.window.name != 'rc_compose_child') {
    if (rcmail) {
        // Window gets centered (more or less)
        var W = 1100;
        var H = 600;
        var L = (screen.width - W) / 2 + screen.left;
        var T = (screen.height - H) / 2 + screen.top - 50;
        T = (T < screen.top ? screen.top : T);
        L = (L < screen.left ? screen.left : L);
        var childwin = window.open(window.location, '', 'width=' + W + ',height=' + H + ',top=' + T + ',left=' + L);
        // Give the child window a name so we can close it later
        childwin.name = 'rc_compose_child';
        history.go(-1);
    }
}