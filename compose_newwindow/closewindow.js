/**
 * compose_newwindow - Compose(Reply/Forward) in a New Window
 *
 * @version 2.05 (20100218)
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

// The following updates the links in the ContextMenu Plugin
$(document).ready(function(){
    if ( rcmail.contextmenu_command_handlers ) {
        var mli = $("li.reply :a");
        if ( mli.length == 1 ) {
            mli[0].onclick = function(){return replynewwindow('context');};
            mli[0].href = '';
        }
        mli = $("li.replyall :a");
        if ( mli.length == 1 ) {
            mli[0].onclick = function(){return replyallnewwindow('context');};
            mli[0].href = '';
        }
        mli = $("li.forward :a");
        if ( mli.length == 1 ) {
            mli[0].onclick = function(){return forwardnewwindow('context');};
            mli[0].href = '';
        }
        mli = $("li.composeto.separator_below :a");
        if ( mli.length == 1 ) {
            mli[0].onclick = function(){return abookcomposenewwindow('context');};
            mli[0].href = '';
        }
    }
});
