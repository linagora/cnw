/**
 * compose_newwindow - Compose(Reply/Forward) in a New Window
 *
 * @version 1.05 (20100212)
 * @author Karl McMurdo (user xrxca on roundcubeforum.net)
 * @url http://github.com/xrxca/cnw
 * @copyright (c) 2010 Karl McMurdo
 *
 */ 

function compnw_onLoad() {
    var compnwButton = $("a.compose");
    if ( compnwButton.length == 1 ) {
        compnwButton[0].onclick = function(){return compnw_getaddrs('');};
    }
}

function compnw_abookcompose(response) 
{
    // Window gets centered (more or less)
    var W = 1100;
    var H = 600;
    var L = ( screen.width - W ) / 2 + screen.left;
    var T = ( screen.height - H ) / 2 + screen.top - 50;
    T = (T<screen.top?screen.top:T);
    L = (L<screen.left?screen.left:L);
    var url = rcmail.env.comm_path+'&_action=compose';
    url = rcmail.get_task_url('mail', url)+'&_mailto='+response;
    var childwin = window.open(url,'','width='+W+',height='+H+',top='+T+',left='+L);
    // Give the child window a name so we can close it later
    childwin.name = 'rc_compose_child';
    return(false);
}

function compnw_getaddrs() {
    if (!rcmail) return(true);
    if(!rcmail.contact_list) return(true);
    var selection = rcmail.contact_list.get_selection();
    if (selection.length) {
        var a_cids = new Array();
        for (var n=0; n<selection.length; n++)
            a_cids[a_cids.length] = selection[n];
        if(a_cids.length) {
            rcmail.addEventListener('plugin.composenewwindow_abooksend', compnw_abookcompose);
            rcmail.http_request('plugin.composenewwindow_abooksend', '_cid='+urlencode(a_cids.join(','))+'&_source='+urlencode(rcmail.env.source), true);
        }
    }
    return(false);
}

