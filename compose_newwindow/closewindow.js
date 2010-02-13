/**
 * compose_newwindow - Compose(Reply/Forward) in a New Window
 *
 * @version 2.01 (20100213)
 * @author Karl McMurdo (user xrxca on roundcubeforum.net)
 * @url http://github.com/xrxca/cnw
 * @copyright (c) 2010 Karl McMurdo
 *
 */ 

// If this is a child window and the parent is still around close it.
if (self.window.name == 'rc_compose_child' ){
    if (window.opener.rcmail) {
        var l = '' + window.location;
        window.opener.focus();
        if ( l.indexOf('&_refresh=1') == -1 ) {
            window.opener.location = l;
        }
	    window.close();
    } else {
	    window.name = 'rc_new_parent';
    }
}
