/**
 * compose_newwindow - Compose(Reply/Forward) in a New Window
 *
 * @version 2.01 (20100213)
 * @author Karl McMurdo (user xrxca on roundcubeforum.net)
 * @url http://github.com/xrxca/cnw
 * @copyright (c) 2010 Karl McMurdo
 *
 */ 

if (window.rcmail) {
  rcmail.addEventListener('init', function(evt) {
    rcmail.register_command('plugin.composenewwindow', composenewwindow, true);
    rcmail.register_command('plugin.replynewwindow', replynewwindow, true); 
    rcmail.register_command('plugin.reply-allnewwindow', replyallnewwindow, true); 
    rcmail.register_command('plugin.composenewwindow', composenewwindow, true); 
    rcmail.register_command('plugin.forwardnewwindow', forwardnewwindow, true); 
    rcmail.register_command('plugin.abookcomposenewwindow', abookcomposenewwindow, true); 
  })
}

function composenewwindow(emailaddr) {
    if (!rcmail) return(true);
    var url=rcmail.env.comm_path+"&_action=compose"; 
    url = rcmail.get_task_url('mail', url)+'&_to='+urlencode(emailaddr);
    opencomposewindow(url);
    return(false);
}

function replynewwindow(i) {
    if (!rcmail) return(true);
    var uid;
    if(uid=rcmail.get_single_uid()) {
        var url=rcmail.env.comm_path+"&_action=compose&_mbox="+urlencode(rcmail.env.mailbox)+"&_reply_uid="+uid;
        opencomposewindow(url);
    }
    return(false);
}

function replyallnewwindow(i) {
    if (!rcmail) return(true);
    var uid;
    if(uid=rcmail.get_single_uid()) {
        var url=rcmail.env.comm_path+"&_action=compose&_mbox="+urlencode(rcmail.env.mailbox)+"&_reply_uid="+uid+"&_all=1";
        opencomposewindow(url);
    }
    return(false);
}

function forwardnewwindow(i) {
    if (!rcmail) return(true);
    var uid;
    if(uid=rcmail.get_single_uid()) {
        var url=rcmail.env.comm_path+"&_action=compose&_mbox="+urlencode(rcmail.env.mailbox)+"&_forward_uid="+uid;
        opencomposewindow(url);
    }
    return(false);
}

function abookcomposenewwindow(i) {
    if (!rcmail) return(true);
    if(!rcmail.contact_list) return(true);
    var selection = rcmail.contact_list.get_selection();
    if (selection.length) {
        var a_cids = new Array();
        for (var n=0; n<selection.length; n++)
            a_cids[a_cids.length] = selection[n];
        if(a_cids.length) {
            rcmail.addEventListener('plugin.composenewwindow_abooksend', abookcomposecallback);
            rcmail.http_request('plugin.composenewwindow_abooksend', '_cid='+urlencode(a_cids.join(','))+'&_source='+urlencode(rcmail.env.source), true);
        }
    }
    return(false);
}

function abookcomposecallback(response) {
    var url = rcmail.env.comm_path+'&_action=compose';
    url = rcmail.get_task_url('mail', url)+'&_mailto='+response;
    opencomposewindow(url);
}

function opencomposewindow(url) {
    // Window gets centered (more or less)
    var W = 1100;
    var H = 600;
    var L = ( screen.width - W ) / 2 + screen.left;
    var T = ( screen.height - H ) / 2 + screen.top - 50;
    T = (T<screen.top?screen.top:T);
    L = (L<screen.left?screen.left:L);
    var childwin = window.open(url,'','width='+W+',height='+H+',top='+T+',left='+L);
    // Give the child window a name so we can close it later
    childwin.name = 'rc_compose_child';
    return(false);
}
