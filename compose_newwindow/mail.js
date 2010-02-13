/**
 * compose_newwindow - Compose(Reply/Forward) in a New Window
 *
 * @version 1.05 (20100212)
 * @author Karl McMurdo (user xrxca on roundcubeforum.net)
 * @url http://github.com/xrxca/cnw
 * @copyright (c) 2010 Karl McMurdo
 *
 */ 

// In only allow main window to be mail list
if (self.window.name == 'rc_compose_child' ){
    if (window.opener.rcmail) {
	window.opener.focus();
// Disabled reload of main window, want to get it to reload message list only
// to show the reply flag if applicable, othereise leave it where it was
//	window.opener.location = window.location;
//	window.close();
    } else {
	// If the parent has gone away just rename this window and continue.
	window.name = 'rc_new_parent';
    }
}

// Changes what the compose/reply/forward buttons do
function compnw_onLoad() {
    var compnwButton = $("a.compose");
    if ( compnwButton.length == 1 ) {
        compnwButton[0].onclick = function(){return compnw_compose('');};
    }
    compnwButton = $("a.reply");
    if ( compnwButton.length == 1 ) {
        compnwButton[0].onclick = function(){return compnw_reply(false);};
    }
    compnwButton = $("a.replyAll");
    if ( compnwButton.length == 1 ) {
        compnwButton[0].onclick = function(){return compnw_reply(true);};
    }
    compnwButton = $("a.forward");
    if ( compnwButton.length == 1 ) {
        compnwButton[0].onclick = function(){return compnw_forward();};
    }
}

// Open a compose window
function compnw_compose(url_extra) {
    if (!rcmail) return(true);
    // Window gets centered (more or less)
    var W = 1100;
    var H = 600;
    var L = ( screen.width - W ) / 2 + screen.left;
    var T = ( screen.height - H ) / 2 + screen.top - 50;
    T = (T<screen.top?screen.top:T);
    L = (L<screen.left?screen.left:L);
    var childwin = window.open(rcmail.env.comm_path+"&_action=compose&_mbox="+urlencode(rcmail.env.mailbox)+url_extra,'','width='+W+',height='+H+',top='+T+',left='+L);
    // Give the child window a name so we can close it later
    childwin.name = 'rc_compose_child';
    return(false);
}

// Open a reply compose window
function compnw_reply(all) {
    if (rcmail)
    {
        var uid;
        if(uid=rcmail.get_single_uid()) {
            return(compnw_compose("&_reply_uid="+uid+(all?"&_all=1":"")));
        }
    }
}

// Open a forward compose window
function compnw_forward() {
    if (rcmail)
    {
        var uid;
        if(uid=rcmail.get_single_uid()) {
            return(compnw_compose("&_forward_uid="+uid));
        }
    }
}
