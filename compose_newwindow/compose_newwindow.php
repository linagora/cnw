<?php
/**
 * compose_newwindow - Compose(Reply/Forward) in a New Window
 *
 * @version 1.02 (20100210)
 * @author Karl McMurdo (user xrxca on roundcubeforum.net)
 * @url http://github.com/xrxca/cnw
 * @copyright (c) 2010 Karl McMurdo
 *
 */ 

class compose_newwindow extends rcube_plugin
{
    
    function init()
    {
            $this->add_hook('render_page', array($this, 'compnw_renderpage'));
    }

    function compnw_renderpage($args){
	if($args['template'] == "mail"){
		$rcmail = rcmail::get_instance();
		$this->include_script("mail.js");
		$script  = "<script type=\"text/javascript\">\n";
		$script .= "compnw_onLoad();\n";
		$script .= "</script>\n";
		$rcmail->output->add_footer($script);
		// It should be possible to link the script to the onload
		// event, but this seems to work.
	} elseif($args['template'] == "compose"){
		$rcmail = rcmail::get_instance();
		$cssfile = 'skins/'.$rcmail->config->get('skin').'/compose.css';
		if (!is_file(realpath(slashify($this->home).$cssfile)))
		          $cssfile = 'skins/default/compose.css';
		$this->include_stylesheet($cssfile);
		$this->include_script("compose.js");
	}
    }
}
?>
